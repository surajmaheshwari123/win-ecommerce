const logger = require("../logger/winston.logger");
const { ApiResponse } =  require("../utils/apiResponse");
const { createProduct, getAllProducts, deleteProduct, updateProduct } =  require('../service/productService.js');


// Get all products
const getAllProductsController = async (req, res) => {
    try {
        const response = await getAllProducts();
        ApiResponse(res, response.success, response.message, response.success ? 200 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};

// Create product
const createProductController = async (req, res) => {
    try {
        const { name, description, image_url, category_id, variants } = req.body;
        if (!name || !category_id) {
            return ApiResponse(res, false, "Name and category_id are required", 400);
        }

        const response = await createProduct(name, description, image_url, category_id, variants);
        ApiResponse(res, response.success, response.message, response.success ? 201 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};

// Update product
const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!id) {
            return ApiResponse(res, false, "Product ID is required", 400);
        }

        const response = await updateProduct(id, updateData);
        ApiResponse(res, response.success, response.message, response.success ? 200 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};

// Soft delete product
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await deleteProduct(id);
        ApiResponse(res, response.success, response.message, response.success ? 200 : 500);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};

module.exports =  { getAllProductsController, createProductController, updateProductController, deleteProductController };
