const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { pool } = require('../config/db');
const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ==================== CONTACT ROUTES ====================

// POST /api/contact - Send contact form
router.post('/',
  [
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('subject')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Subject must be at least 3 characters'),
    body('message')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Message must be at least 10 characters')
  ],
  async (req, res) => {
    try {
      // Check validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { name, email, subject, message } = req.body;

      // 1. Save to MySQL Database
      const [result] = await pool.execute(
        'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message]
      );

      const messageId = result.insertId;
      console.log(`✅ Message saved to database. ID: ${messageId}`);

      // 2. Send email to you (optional - will work even if email fails)
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.PERSONAL_EMAIL,
          subject: `Portfolio: ${subject}`,
          html: `
            <h2>New Message from Portfolio</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Message ID: #${messageId}</small></p>
          `
        });
        console.log('📧 Email sent successfully');
      } catch (emailError) {
        console.log('⚠️ Email not sent (this is OK):', emailError.message);
      }

      // 3. Send success response
      res.status(201).json({
        success: true,
        message: 'Message sent successfully!',
        data: {
          id: messageId,
          name: name,
          email: email
        }
      });

    } catch (error) {
      console.error('❌ Error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again.'
      });
    }
  }
);

// GET /api/contact/messages - Get all messages
router.get('/messages', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const [messages] = await pool.execute(
      'SELECT id, name, email, subject, message, is_read, created_at FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [parseInt(limit), parseInt(offset)]
    );

    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as total FROM messages'
    );

    res.json({
      success: true,
      count: messages.length,
      total: countResult[0].total,
      data: messages
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages'
    });
  }
});

// GET /api/contact/messages/unread - Get unread count
router.get('/messages/unread', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'SELECT COUNT(*) as count FROM messages WHERE is_read = FALSE'
    );

    res.json({
      success: true,
      unreadCount: result[0].count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get count'
    });
  }
});

// PUT /api/contact/messages/:id/read - Mark message as read
router.put('/messages/:id/read', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'UPDATE messages SET is_read = TRUE WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update message'
    });
  }
});

// DELETE /api/contact/messages/:id - Delete message
router.delete('/messages/:id', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM messages WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete message'
    });
  }
});

module.exports = router;