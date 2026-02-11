const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');


const getProducts = async (req, res) => {
  try {
    const { brand, type } = req.query;

    // Empty filter object
    let filter = {};

    // If brand is provided
    if (brand) {
      filter.brand = brand;
    }

    // If type is provided
    if (type) {
      filter.type = type;
    }

    // Fetch products based on filter
    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//create products ;;

const createProduct = async (req, res) =>{
    try {
    const { title, type, brand } = req.body;
    const imageUrl = req.file.path;

    const product = await Product.create({
      title,
      type,
      brand,
      imageUrl
    });

    return res.status(201).json({
      success: true,
      product
    });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Could not create product",
        });
    }
}

// UPDATE product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      brand: req.body.brand,
      type: req.body.type
    };

    // 🔹 If new image uploaded → upload to Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "tajmahal-products"
        }
      );

      updateData.imageUrl = uploadResult.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message
    });
  }
};




 const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
 const getProductStats = async (req, res) => {
  try {
    const products = await Product.find();

    // ✅ Brand distribution (for Pie chart)
    const brandMap = {};
    products.forEach((p) => {
      brandMap[p.brand] = (brandMap[p.brand] || 0) + 1;
    });

    const brandChart = Object.keys(brandMap).map((brand) => ({
      name: brand,
      value: brandMap[brand],
    }));

    // ✅ Product ranking (for Bar chart)
    const rankingChart = products.map((p) => ({
      name: p.title,
      count: 1, // you can change later if you add views/sales
    }));

    console.log("Stats computed:", { brandChart, rankingChart });

    res.json({
      brandChart,
      rankingChart,
      totalProducts: products.length,
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Stats API failed" });
  }
};





module.exports = { getProducts, createProduct, updateProduct, deleteProduct , getProductStats};