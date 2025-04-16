const Product = require('../models/productsModel');

exports.getAllProducts = async (req, res) => {
    let products = await Product.find({});
    res.status(200).json({
        status: 'success',
        message: products,
    });
};

exports.createProduct = async (req, res) => {
    try {
        let newProduct = await Product.create(req.body);

        // Populate related fields if necessary
        newProduct = await Product.findById(newProduct._id).populate('category');

        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getProduct = async (req, res) => {
    try{
       let product = await Product.find({ price: { $gt: req.params.price } });
        res.status(200).json({
            status: 'success',
            message: product,
        });
    } catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.updateProduct = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: `Update product with ID ${req.params.id}`,
    });
};

exports.deleteProduct = async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
        return res.status(404).json({
            status: 'fail',
            message: 'No product found with that ID',
        });
    }else
    res.status(204).json({
        status: 'success',
        message: `Deleted product with ID ${req.params.id}`,
    });
};