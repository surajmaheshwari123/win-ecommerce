const express = require("express");
const router = express.Router();

const { 
  getVariantsController, 
  createVariantController, 
  updateVariantController, 
  deleteVariantController 
} = require("../controller/variantController");

const { validateVariant } = require("../model/model.js");
/**
 * @swagger
 * /apis/create-variant:
 *   post:
 *     summary: Create a new variant
 *     description: Adds a new product variant with details such as name, price, size, and color.
 *     tags:
 *       - Variants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Variant Name"
 *               mrp:
 *                 type: number
 *                 example: 1999.99
 *               discount_price:
 *                 type: number
 *                 example: 1499.99
 *               size:
 *                 type: string
 *                 example: "M"
 *               color:
 *                 type: string
 *                 example: "Red"
 *     responses:
 *       201:
 *         description: Variant added successfully
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
 *                   example: "Variant added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     product_id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Variant Name"
 *                     mrp:
 *                       type: number
 *                       example: 1999.99
 *                     discount_price:
 *                       type: number
 *                       example: 1499.99
 *                     size:
 *                       type: string
 *                       example: "M"
 *                     color:
 *                       type: string
 *                       example: "Red"
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/create-variant", validateVariant, createVariantController);

/**
 * @swagger
 * /apis/get-all-variants:
 *   get:
 *     summary: Retrieve all variants
 *     description: Get a list of all product variants.
 *     tags:
 *       - Variants
 *     responses:
 *       200:
 *         description: A list of variants
 *       500:
 *         description: Server error
 */
router.get("/get-all-variants", getVariantsController);

/**
 * @swagger
 * /apis/update-variant/{variantId}:
 *   put:
 *     summary: Update a variant
 *     description: Modify the details of an existing product variant.
 *     tags:
 *       - Variants
 *     parameters:
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the variant to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Blue T-Shirt - Large"
 *               price:
 *                 type: number
 *                 example: 21.99
 *     responses:
 *       200:
 *         description: Variant updated successfully
 *       400:
 *         description: Invalid request
 */
router.put("/update-variant/:variantId", updateVariantController);

/**
 * @swagger
 * /apis/delete-variant/{variantId}:
 *   delete:
 *     summary: Delete a variant
 *     description: Remove a product variant by its ID.
 *     tags:
 *       - Variants
 *     parameters:
 *       - in: path
 *         name: variantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the variant to delete
 *     responses:
 *       200:
 *         description: Variant deleted successfully
 *       404:
 *         description: Variant not found
 */
router.delete("/delete-variant/:variantId", deleteVariantController);

module.exports = router;
