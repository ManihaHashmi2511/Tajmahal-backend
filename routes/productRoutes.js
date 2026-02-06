const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getProductStats } = require('../controller/productController');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { upload } = require('../middlewares/multer');

const productRoute = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'tajmahal-products',
        allowedFormats: ['jpg', 'png', 'webp'],
    }
});
const parser = multer({ storage });


productRoute.get('/', getProducts);

//Post route to add new product

productRoute.post('/', parser.single('image'), createProduct);

//update route
productRoute.put('/:id',upload.single("image"), updateProduct);

productRoute.delete("/:id", deleteProduct);
productRoute.get("/stats", getProductStats);



module.exports = productRoute;