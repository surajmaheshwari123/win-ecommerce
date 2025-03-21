
const express = require("express");
const router = express.Router()

const { getVariantsController, createVariantController, updateVariantController, deleteVariantController } = require("../controller/variantController");
const { validateVariant } = require("../model/model.js");

router.post("/create-variant", validateVariant, createVariantController);
router.get("/get-all-variants", getVariantsController);
router.put("/update-variant/:variantId", updateVariantController);  
router.delete("/delete-variant/:variantId", deleteVariantController);

module.exports = router;
