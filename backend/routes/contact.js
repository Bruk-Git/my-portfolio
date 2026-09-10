const express = require("express");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { pool } = require("../config/db");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// GET /api/contact - Test endpoint
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Contact API is working!",
    endpoints: {
      post: "POST /api/contact",
      getMessages: "GET /api/contact/messages",
    },
  });
});

// POST /api/contact - Send message
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
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { name, email, subject, message } = req.body;

      const [result] = await pool.execute(
        "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
        [name, email, subject, message],
      );

      const messageId = result.insertId;
      console.log(`✅ Message saved. ID: ${messageId}`);

      // Try sending email (optional)
      try {
        await transporter.sendMail({
          from: `"Portfolio" <${process.env.EMAIL_USER}>`,
          to: process.env.PERSONAL_EMAIL,
          subject: `Portfolio: ${subject}`,
          html: `<h2>New Message</h2><p><b>From:</b> ${name} (${email})</p><p><b>Subject:</b> ${subject}</p><p>${message}</p>`,
        });
        console.log("📧 Email sent");
      } catch (emailError) {
        console.log("⚠️ Email skipped:", emailError.message);
      }

      res.status(201).json({
        success: true,
        message: "Message sent successfully!",
        data: { id: messageId, name, email },
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Failed to send message." });
    }
  },
);

// GET /api/contact/messages - Get all messages
router.get("/messages", async (req, res) => {
  try {
    const [messages] = await pool.execute(
      "SELECT * FROM messages ORDER BY created_at DESC",
    );
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/contact/messages/:id/read - Mark as read
router.put("/messages/:id/read", async (req, res) => {
  try {
    await pool.execute("UPDATE messages SET is_read = TRUE WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ success: true, message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/contact/messages/:id
router.delete("/messages/:id", async (req, res) => {
  try {
    await pool.execute("DELETE FROM messages WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
