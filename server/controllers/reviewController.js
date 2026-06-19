import Review from '../models/review.js';
import Car from '../models/car.js';

export const addReview = async (req, res) => {
    try {
        const { carId, rating, comment } = req.body;
        const userId = req.user._id;

        if (!carId || !rating) {
            return res.json({ success: false, message: 'Car ID and rating are required' });
        }

        // Check if user already reviewed this car
        const existingReview = await Review.findOne({ user: userId, car: carId });
        if (existingReview) {
            // Optional: update instead of reject? Let's just update if it exists.
            existingReview.rating = rating;
            existingReview.comment = comment;
            await existingReview.save();
            return res.json({ success: true, message: 'Review updated successfully', review: existingReview });
        }

        const newReview = await Review.create({
            user: userId,
            car: carId,
            rating: Number(rating),
            comment
        });

        res.json({ success: true, message: 'Review submitted successfully', review: newReview });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export const getCarReviews = async (req, res) => {
    try {
        const { carId } = req.params;

        const reviews = await Review.find({ car: carId })
            .populate('user', 'name image') // populate reviewer name and image
            .sort({ createdAt: -1 });

        res.json({ success: true, reviews });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
