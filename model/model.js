const Joi = require("joi");
const variantSchema = Joi.object({
    product_id: Joi.number().integer().required(),  
    name: Joi.string().min(3).max(100).optional(),  
    mrp: Joi.number().positive().required(),  
    discount_price: Joi.number().positive().optional(),
    size: Joi.string().optional(),  
    color: Joi.string().optional(), 
    is_deleted: Joi.boolean().default(false) 
});

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100),
    image_url: Joi.string().min(3).max(100),
    category_id: Joi.number().integer().required(),
    discount_price: Joi.number().positive().optional(),
    size: Joi.string().optional(),
    color: Joi.string().optional(),
    variants: Joi.array().items(variantSchema).optional()
});

const categorySchema = Joi.object({
    name: Joi.string().min(3).max(100).required(), 
    parent_id: Joi.number().integer().allow(null),  
    is_deleted: Joi.boolean().default(false)  
});


const validateCategory = (req, res, next) => {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};

const validateVariant = (req, res, next) => {
    const { error } = variantSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
};




module.exports = {  validateProduct , validateCategory, validateVariant };