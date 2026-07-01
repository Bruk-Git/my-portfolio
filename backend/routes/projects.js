const express = require('express');
const { pool } = require('../config/db');
const router = express.Router();

// ==================== PROJECT ROUTES ====================

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    // Get projects
    const [projects] = await pool.execute(
      'SELECT * FROM projects ORDER BY display_order ASC, created_at DESC'
    );

    // For each project, get its technologies and features
    for (let project of projects) {
      const [tech] = await pool.execute(
        'SELECT technology FROM project_technologies WHERE project_id = ?',
        [project.id]
      );
      project.technologies = tech.map(t => t.technology);

      const [features] = await pool.execute(
        'SELECT feature_text FROM project_features WHERE project_id = ?',
        [project.id]
      );
      project.features = features.map(f => f.feature_text);
    }

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// GET /api/projects/featured - Get featured projects only
router.get('/featured', async (req, res) => {
  try {
    const [projects] = await pool.execute(
      'SELECT * FROM projects WHERE featured = TRUE ORDER BY display_order ASC'
    );

    for (let project of projects) {
      const [tech] = await pool.execute(
        'SELECT technology FROM project_technologies WHERE project_id = ?',
        [project.id]
      );
      project.technologies = tech.map(t => t.technology);

      const [features] = await pool.execute(
        'SELECT feature_text FROM project_features WHERE project_id = ?',
        [project.id]
      );
      project.features = features.map(f => f.feature_text);
    }

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const [projects] = await pool.execute(
      'SELECT * FROM projects WHERE id = ?',
      [req.params.id]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = projects[0];

    const [tech] = await pool.execute(
      'SELECT technology FROM project_technologies WHERE project_id = ?',
      [project.id]
    );
    project.technologies = tech.map(t => t.technology);

    const [features] = await pool.execute(
      'SELECT feature_text FROM project_features WHERE project_id = ?',
      [project.id]
    );
    project.features = features.map(f => f.feature_text);

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
});

module.exports = router;