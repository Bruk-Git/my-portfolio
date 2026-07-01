const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', async (req, res, next) => {
  try {
    const { category, featured, status } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (status) query.status = status;

    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/featured - Get featured projects
router.get('/featured', async (req, res, next) => {
  try {
    const projects = await Project.find({ featured: true })
      .sort({ order: 1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/projects - Create a project (for admin)
router.post('/', async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;