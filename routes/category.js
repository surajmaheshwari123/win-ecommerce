

const express = require("express");
const {  addCategoryController,getCategoryByIdController, updateCategoryController, deleteCategoryByIdController } = require("../controller/categoryController");
const router = express.Router()
const { validateCategory } = require("../model/model.js");


router.post("/add-catgory", validateCategory, addCategoryController);
router.get("/get-category-by-id/:categoryId", getCategoryByIdController);
router.put("/update-category/:categoryId", updateCategoryController);
router.delete("/delete-category/:categoryId", deleteCategoryByIdController);


module.exports = router;