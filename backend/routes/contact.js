const express = require("express");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { pool } = require("../config/db"); // ← ADD THIS LINE
const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/contact - Save to MySQL AND send email
router.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("subject")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Subject must be at least 3 characters"),
    body("message")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, email, subject, message } = req.body;

      // Save to MySQL
      const [result] = await pool.execute(
        "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
        [name, email, subject, message],
      );

      const messageId = result.insertId;
      console.log(`✅ Message saved to database. ID: ${messageId}`);

      // Try to send email (optional)
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
          `,
        });
        console.log("📧 Email sent successfully");
      } catch (emailError) {
        console.log("⚠️ Email not sent:", emailError.message);
      }

      // Send success response
      res.status(201).json({
        success: true,
        message: "Message sent successfully!",
        data: {
          id: messageId,
          name: name,
          email: email,
        },
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    }
  },
);

// GET /api/contact/messages - Get all messages
router.get("/messages", async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const [messages] = await pool.execute(
      "SELECT id, name, email, subject, message, is_read, created_at FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [parseInt(limit), parseInt(offset)],
    );

    const [countResult] = await pool.execute(
      "SELECT COUNT(*) as total FROM messages",
    );

    res.json({
      success: true,
      count: messages.length,
      total: countResult[0].total,
      data: messages,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
});

module.exports = router;
