const express = require('express');
const router = express.Router({ mergeParams: true });

const reviewController = require('../controllers/reviews');
const { validateReview, isReviewAuthor, isLoggedIn } = require('../middleware')
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.createReview));

router.delete('/:reviewId', isReviewAuthor, isLoggedIn, catchAsync(reviewController.deleteReview));

module.exports = router;
