const { 
    createVariant, 
    getAllVariants, 
    updateVariant, 
    softDeleteVariant 
} =  require('../service/variantService.js');
const { ApiResponse } =  require("../utils/apiresponse");
const logger = require("../logger/winston.logger");

// Get all variants that are not soft deleted
  const getVariantsController = async (req, res) => {
    try {
        const response = await getAllVariants();
        return ApiResponse(res, response.success, response.message, response.success ? 200 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        return ApiResponse(res, false, "Error occurred", 500);
    }
};

// Create a new variant
  const createVariantController = async (req, res) => {
    try {
        const { product_id, name, mrp, discount_price, size, color } = req.body;
        if (!product_id || !mrp) {
            return ApiResponse(res, false, "Product ID and MRP are required", 400);
        }
        const response = await createVariant(product_id, name, mrp, discount_price, size, color);
        return ApiResponse(res, response.success, response.message, response.success ? 201 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        return ApiResponse(res, false, "Error occurred", 500);
    }
};

// Update an existing variant
  const updateVariantController = async (req, res) => {
    try {
        const {variantId}  = req.params;
        const {name, mrp, discount_price, size, color } = req.body;
        if (!variantId) {
            return ApiResponse(res, false, "Variant ID is required", 400);
        }
        const response = await updateVariant(variantId, name, mrp, discount_price, size, color);
        return ApiResponse(res, response.success, response.message, response.success ? 200 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        return ApiResponse(res, false, "Error occurred", 500);
    }
};

// Soft delete a variant by setting is_deleted = true
  const deleteVariantController = async (req, res) => {
    try {
        const { variantId } = req.params;
        if (!variantId) {
            return ApiResponse(res, false, "Variant ID is required", 400);
        }
        const response = await softDeleteVariant(variantId);
        return ApiResponse(res, response.success, response.message, response.success ? 200 : 500);
    } catch (error) {
        logger.error(error.message);
        return ApiResponse(res, false, "Error occurred", 500);
    }
};

module.exports = { getVariantsController, createVariantController, updateVariantController, deleteVariantController };