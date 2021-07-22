const Courses = require('../models/Courses');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

// @route       GET api/courses
// @dec         Get all courses
// @access      Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
  let query;

  let uiValues = {
    filtering: {},
    sorting: {},
  };

  const reqQuery = { ...req.query };

  const removeFields = ['sort'];

  removeFields.forEach((val) => delete reqQuery[val]);

  const filterKeys = Object.keys(reqQuery);
  const filterValues = Object.values(reqQuery);

  filterKeys.forEach(
    (val, idx) => (uiValues.filtering[val] = filterValues[idx])
  );

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Courses.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortByArr = req.query.sort.split(',');
    sortByArr.forEach((val) => {
      let order;
      val[0] === '-' ? (order = 'descending') : (order = 'ascending');

      uiValues.sorting[val.replace('-', '')] = order;
    });
    const sortByStr = sortByArr.join(' ');

    query = query.sort(sortByStr);
  } else {
    query = query.sort('-price');
  }

  const courses = await query;

  const maxPrice = await Courses.find()
    .sort({ price: -1 })
    .limit(1)
    .select('-_id price');

  const minPrice = await Courses.find()
    .sort({ price: 1 })
    .limit(1)
    .select('-_id price');

  uiValues.maxPrice = maxPrice[0].price;
  uiValues.minPrice = minPrice[0].price;

  res.status(200).json({
    success: true,
    data: courses,
    uiValues,
  });
});

// @route       POST api/courses
// @dec         Create a new course
// @access      Public
exports.createNewCourse = asyncHandler(async (req, res, next) => {
  const course = await Courses.create(req.body);

  res.status(201).json({
    success: true,
    data: course,
  });
});

// @route       PUT api/courses
// @dec         Update a course
// @access      Public
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let singleCourse = await Courses.findById(req.params.id);

  if (!singleCourse) {
    return next(
      new ErrorResponse(`Courses with id ${req.params.id} was not found`, 404)
    );
  }

  singleCourse = await Courses.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: singleCourse,
  });
});

// @route       DELETE api/courses
// @dec         Delete a course
// @access      Public
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let singleCourse = await Courses.findById(req.params.id);

  if (!singleCourse) {
    return next(
      new ErrorResponse(`Courses with id ${req.params.id} was not found`, 404)
    );
  }

  await singleCourse.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
