const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name to the bootcamp'],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating for a bootcamp'],
  },
  description: {
    type: String,
    required: [true, 'Please provide bootcamp with description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide bootcamp with price'],
  },
});

module.exports = Courses = mongoose.model('Course', CoursesSchema);
