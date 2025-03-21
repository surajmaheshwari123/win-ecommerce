const logger = require("../logger/winston.logger");
 //Get all variants that are not deleted
 
exports.getAllVariants = async () => {
    try {
        const result = await knexSqlDb("variants")
            .select("*")
            .where("is_deleted", false);

        return { success: true, message: "Variants retrieved successfully", data: result };
    } catch (error) {
        logger.error(error.message);
        return { success: false, message: "Error occurred" };
    }
};

// Create a new variant using transaction
 
exports.createVariant = async (product_id, name, mrp, discount_price, size, color) => {
    const trx = await knexSqlDb.transaction();
    try {
        const [insertedVariant] = await trx("variants")
            .insert({
                product_id,
                name,
                mrp,
                discount_price,
                size,
                color,
                is_deleted: false
            })
            .returning("*");

        await trx.commit();
        return { success: true, message: "Variant added successfully", data: insertedVariant };
    } catch (error) {
        await trx.rollback();
        logger.error(error.message);
        return { success: false, message: "Error occurred" };
    }
};

// Update an existing variant using transaction
exports.updateVariant = async (variant_id, name, mrp, discount_price, size, color) => {
    const trx = await knexSqlDb.transaction();
    try {
        const [updatedVariant] = await trx("variants")
            .where({ id:variant_id, is_deleted: false })
            .update({
                name,
                mrp,
                discount_price,
                size,
                color
            })
            .returning("*");

        await trx.commit();
        return { success: true, message: "Variant updated successfully", data: updatedVariant };
    } catch (error) {
        await trx.rollback();
        logger.error(error.message);
        return { success: false, message: "Error occurred" };
    }
};

//  Soft delete a variant by setting is_deleted = true using transaction
 
exports.softDeleteVariant = async (variant_id) => {
    const trx = await knexSqlDb.transaction();
    try {
        const [deletedVariant] = await trx("variants")
            .where({ id:variant_id, is_deleted: false })
            .update({ is_deleted: true })
            .returning("*");

        await trx.commit();
        return { success: true, message: "Variant deleted successfully", data: deletedVariant };
    } catch (error) {
        await trx.rollback();
        logger.error(error.message);
        return { success: false, message: "Error occurred" };
    }
};
