const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock cannot be negative'],
    },
    images: [
        {
            type: String,
            required: [true, 'At least one image is required'],
        },
    ],
    ratings: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5'],
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'User reference is required for a review'],
            },
            comment: {
                type: String,
                required: [true, 'Review comment is required'],
            },
            rating: {
                type: Number,
                required: [true, 'Review rating is required'],
                min: [0, 'Rating cannot be less than 0'],
                max: [5, 'Rating cannot be more than 5'],
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;