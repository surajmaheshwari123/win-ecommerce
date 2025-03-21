
const express = require("express");
const router = express.Router()
const { validateProduct } = require("../model/model.js");

const { getAllProductsController, createProductController, updateProductController, deleteProductController } = require("../controller/productController");
router.get("/get-all-products", getAllProductsController);
router.post("/create-product", validateProduct, createProductController);
router.put("/update-product/:id", updateProductController); 
router.delete("/delete-product/:id", deleteProductController);


module.exports = router;