const express = require('express');
const coursesControllers = require('../controllers/coursesControllers');
const router = express.Router();

router
  .route('/')

  // @route - GET  /api/courses/
  // access - Public
  .get(coursesControllers.getAllCourses)

  // @route - POST  /api/courses/
  // access - Public
  .post(coursesControllers.createNewCourse);

router
  .route('/:id')

  // @route - PUT  /api/courses/
  // access - Public
  .put(coursesControllers.updateCourse)

  // @route - DELETE  /api/courses/
  // access - Public
  .delete(coursesControllers.deleteCourse);

module.exports = router;
