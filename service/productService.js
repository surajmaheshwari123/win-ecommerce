const logger = require("../logger/winston.logger");
// Get all products with their variants
exports.getAllProducts = async () => {
    try {
        const products = await knexSqlDb('products')
            .where({ is_deleted: false })
            .select('*');

        for (let product of products) {
            product.variants = await knexSqlDb('variants')
                .where({ product_id: product.id, is_deleted: false })
                .select('*');
        }

        return { success: true, message: "Products retrieved successfully", data: products };
    } catch (error) {
        logger.error(error.message);
        return { success: false, message: "Error retrieving products" };
    }
};

// Create a new product
exports.createProduct = async (name, description, image_url, category_id, variants) => {
    const trx = await knexSqlDb.transaction();
    try {
        const [product] = await trx('products')
            .insert({ name, description, image_url, category_id })
            .returning('*');

        if (variants && variants.length > 0) {
            for (let variant of variants) {
                await trx('variants').insert({
                    product_id: product.id,
                    name: variant.name,
                    mrp: variant.mrp,
                    discount_price: variant.discount_price,
                    size: variant.size,
                    color: variant.colour,
                });
            }
        }

        await trx.commit();
        return { success: true, message: "Product added successfully", data: product };
    } catch (error) {
        await trx.rollback();
        logger.error(error.message);
        return { success: false, message: "Error creating product" };
    }
};

// Update a product
exports.updateProduct = async (id, updateData) => {
    try {
        const updatedProduct = await knexSqlDb('products')
            .where({ id })
            .update(updateData)
            .returning('*');

        if (!updatedProduct.length) {
            return { success: false, message: "Product not found" };
        }

        return { success: true, message: "Product updated successfully", data: updatedProduct[0] };
    } catch (error) {
        logger.error(error.message);
        return { success: false, message: "Error updating product" };
    }
};

// Soft delete a product (set is_deleted = true)
exports.deleteProduct = async (productId) => {
    const trx = await knexSqlDb.transaction();
    try {
        const product = await trx('products').where({ id: productId }).first();
        if (!product) {
            return { success: false, message: "Product not found" };
        }

        await trx('variants')
            .where({ product_id: productId })
            .update({ is_deleted: true });

        await trx('products')
            .where({ id: productId })
            .update({ is_deleted: true });

        await trx.commit();
        return { success: true, message: "Product deleted successfully" };
    } catch (error) {
        await trx.rollback();
        logger.error(error.message);
        return { success: false, message: "Error deleting product" };
    }
};

 