const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { testConnection } = require("./config/db");

dotenv.config();

const contactRoutes = require("./routes/contact");
const projectsRoutes = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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

startServer();
