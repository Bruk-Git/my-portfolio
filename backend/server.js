const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const { testConnection } = require('./config/db');

// Import routes
const contactRoutes = require('./routes/contact');
const projectsRoutes = require('./routes/projects');

// Import error handler
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      contact: 'POST /api/contact',
      messages: 'GET /api/contact/messages',
      projects: 'GET /api/projects'
    }
  });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
  // Test database connection first
  await testConnection();

  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`);
    console.log(`📁 Projects API: http://localhost:${PORT}/api/projects`);
    console.log('\n✨ Ready to receive requests!\n');
  });
};

startServer();