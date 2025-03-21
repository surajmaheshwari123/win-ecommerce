
const express = require("express");
const router = express.Router()
const { validateProduct } = require("../model/model.js");

const { getAllProductsController, createProductController, updateProductController, deleteProductController } = require("../controller/productController");

/**
 * @swagger
 * /get-all-products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 */
 router.get("/get-all-products", getAllProductsController);
/**
 * @swagger
 * /apis/create-product:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product with optional description, image, and variants.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Wireless Headphones"
 *               description:
 *                 type: string
 *                 description: Optional product description
 *                 example: "High-quality noise-canceling headphones."
 *               image_url:
 *                 type: string
 *                 description: URL of the product image
 *                 example: "https://example.com/headphones.jpg"
 *               category_id:
 *                 type: integer
 *                 description: ID of the product category
 *                 example: 5
 *               variants:
 *                 type: array
 *                 description: Array of product variants
 *                 items:
 *                   type: object
 *                   properties:
 *                     variant_name:
 *                       type: string
 *                       example: "Black"
 *                     price:
 *                       type: number
 *                       example: 199.99
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: "Product created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     name:
 *                       type: string
 *                       example: "Wireless Headphones"
 *       400:
 *         description: Name and category_id are required
 *       500:
 *         description: Internal server error
 */
 router.post("/create-product", validateProduct, createProductController);
/**
 * @swagger
 * /apis/update-product/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update product details such as name, description, image, and category.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the product
 *                 example: "Wireless Headphones"
 *               description:
 *                 type: string
 *                 description: Updated product description
 *                 example: "Latest model with improved noise cancellation."
 *               image_url:
 *                 type: string
 *                 description: Updated image URL of the product
 *                 example: "https://example.com/headphones-new.jpg"
 *               category_id:
 *                 type: integer
 *                 description: Updated category ID
 *                 example: 5
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: "Product updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     name:
 *                       type: string
 *                       example: "Wireless Headphones"
 *       400:
 *         description: Product ID is required
 *       500:
 *         description: Internal server error
 */

 router.put("/update-product/:id", updateProductController); 

/**
 * @swagger
 * /delete-product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */

router.delete("/delete-product/:id", deleteProductController);


module.exports = router;