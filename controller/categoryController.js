const { getAllCategoriesData ,addCategory, getCategoryById, updateCategory, deleteCategoryById} = require("../service/categoryService");
const { ApiResponse } = require("../utils/apiresponse");
const logger = require("../logger/winston.logger");
const addCategoryController = async (req, res) => {
    try {
        const { name, parent_id } = req.body;
        if (!name) {
            return ApiResponse(res, false, "Category name is required", 400);
        }
        const response = await addCategory(name, parent_id);
        ApiResponse(res, response.success, response.message, response.success ? 201 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};


const getAllCategories = async (req, res) => {
    try {
        let result = await getAllCategoriesData();
        if (result.length === 0) {
            ApiResponse(res, false, "No categories found", 404);
            return;
        }
        ApiResponse(res, true, "Categories retrieved successfully", 200, result);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};

const updateCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, parent_id } = req.body;

        if (!name) {
            return ApiResponse(res, false, "Category name is required", 400);
        }

        const response = await updateCategory(categoryId, name, parent_id);
        ApiResponse(res, response.success, response.message, response.success ? 200 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};

const getCategoryByIdController = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const response = await getCategoryById(categoryId);
        ApiResponse(res, response.success, response.message, response.success ? 200 : 500, response.data);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};

const deleteCategoryByIdController = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const response = await deleteCategoryById(categoryId);
        ApiResponse(res, response.success, response.message, response.success ? 200 : 500);
    } catch (error) {
        logger.error(error.message);
        ApiResponse(res, false, "Error occurred", 500);
    }
};




module.exports = {
    getAllCategories,
    addCategoryController,
    updateCategoryController,
    getCategoryByIdController,
    deleteCategoryByIdController
}