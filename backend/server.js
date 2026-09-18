const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { testConnection } = require("./config/db");

dotenv.config();

const contactRoutes = require("./routes/contact");
const projectsRoutes = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 5000;
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const helmet = require("helmet");

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 min
  message: { success: false, message: "Too many requests, try again later." },
});

// Contact form limiter (stricter)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Only 5 messages per hour per IP
  message: {
    success: false,
    message: "Too many messages. Try again in an hour.",
  },
});

const allowedOrigins = [
  "http://localhost:5173",
  "https://bruksportfolio.vercel.app",
  "https://yourdomain.com",
];
const bcrypt = require("bcryptjs");

// Hash password
const hashedPassword = await bcrypt.hash("userPassword", 10);

// Verify password
const isValid = await bcrypt.compare("userInput", hashedPassword);
app.use(morgan("combined"));
app.use(helmet());
app.use("/api/", apiLimiter);
app.use("/api/contact", contactLimiter); // Applied to contact only
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Backend API",
    version: "1.0.0",
  });
});

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

// Start
const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Contact: http://localhost:${PORT}/api/contact`);
    console.log(`📁 Projects: http://localhost:${PORT}/api/projects\n`);
  });
};
app.get("/health", async (req, res) => {
  try {
    await pool.execute("SELECT 1");
    res.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
    });
  }
});

app.use(errorHandler);
startServer();
