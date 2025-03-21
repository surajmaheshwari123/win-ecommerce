const express = require("express");
const { 
  addCategoryController,
  getCategoryByIdController, 
  updateCategoryController, 
  deleteCategoryByIdController 
} = require("../controller/categoryController");
const router = express.Router();
const { validateCategory } = require("../model/model.js");

/**
 * @swagger
 * /apis/add-category:
 *   post:
 *     summary: Add a new category
 *     description: Creates a new category with an optional parent category.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: "Electronics"
 *               parent_id:
 *                 type: integer
 *                 description: ID of the parent category (optional)
 *                 example: 1
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 15
 *                     name:
 *                       type: string
 *                       example: "Electronics"
 *                     parent_id:
 *                       type: integer
 *                       example: null
 *       400:
 *         description: Category name is required
 *       500:
 *         description: Internal server error
 */
router.post("/add-catgory", validateCategory, addCategoryController);

/**
 * @swagger
 * /apis/get-category-by-id/{categoryId}:
 *   get:
 *     summary: Get category by ID
 *     description: Fetches category details including child categories, products, and variants.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Electronics"
 *                     parent_id:
 *                       type: integer
 *                       example: null
 *                     childCategories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           name:
 *                             type: string
 *                             example: "Mobile Phones"
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 10
 *                           name:
 *                             type: string
 *                             example: "iPhone 14"
 *                           category_id:
 *                             type: integer
 *                             example: 1
 *                           variants:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 100
 *                                 name:
 *                                   type: string
 *                                   example: "iPhone 14 - 128GB"
 *                                 product_id:
 *                                   type: integer
 *                                   example: 10
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/get-category-by-id/:categoryId", getCategoryByIdController);

/**
 * @swagger
 * /apis/update-category/{categoryId}:
 *   put:
 *     summary: Update a category
 *     description: Updates the name or parent category of an existing category.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Category Name"
 *               parent_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: "Updated Category Name"
 *                     parent_id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Bad request - category name is required
 *       500:
 *         description: Internal server error
 */
router.put("/update-category/:categoryId", updateCategoryController);

/**
 * @swagger
 * /apis/delete-category/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Remove a category from the system using its ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/delete-category/:categoryId", deleteCategoryByIdController);

module.exports = router;
