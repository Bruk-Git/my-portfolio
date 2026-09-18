// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Don't expose stack traces in production
  const isDev = process.env.NODE_ENV === "development";

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
    ...(isDev && { stack: err.stack }),
  });
};

module.exports = errorHandler;
