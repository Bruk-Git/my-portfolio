const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load env FIRST
dotenv.config();

// Import DB and routes
const { testConnection, pool } = require("./config/db");
const contactRoutes = require("./routes/contact");
const projectsRoutes = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== SECURITY ====================
app.use(helmet());
app.use(morgan("combined"));

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://bruksportfolio.vercel.app/",
  "https://bruksportfolio.vercel.app",
  "https://my-portfolio-git-main-brook5.vercel.app",
];

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

// Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ==================== RATE LIMITING ====================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, try again later." },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many messages. Try again in an hour.",
  },
});

app.use("/api/", apiLimiter);

// ==================== ROUTES ====================

// Welcome
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Backend API",
    version: "1.0.0",
  });
});

// Health check (BEFORE 404)
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

// API routes
app.use("/api/contact", contactLimiter, contactRoutes);
app.use("/api/projects", projectsRoutes);

// ==================== 404 ====================
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ==================== ERROR HANDLER ====================
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

// ==================== START ====================
const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Contact: http://localhost:${PORT}/api/contact`);
    console.log(`📁 Projects: http://localhost:${PORT}/api/projects`);
    console.log(`❤️  Health:  http://localhost:${PORT}/health\n`);
  });
};

startServer();
