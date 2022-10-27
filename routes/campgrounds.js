const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');
const campgroundsController = require('../controllers/campgrounds')

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const catchAsync = require('../utils/catchAsync');

router.get('/', catchAsync(campgroundsController.index));

router.get('/new', isLoggedIn, campgroundsController.renderNewForm);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgroundsController.createCampground));

router.get('/:id', catchAsync(campgroundsController.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundsController.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundsController.editCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Succesfully deleted a campground');
    res.redirect('/campgrounds');
}));

module.exports = router;