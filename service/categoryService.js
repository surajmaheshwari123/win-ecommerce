const logger = require("../logger/winston.logger");
exports.addCategory = async (name, parent_id = null) => {
    const trx = await knexSqlDb.transaction();
    try {
        const result = await trx('categories')
            .insert({ name, parent_id })
            .returning('*');

        if (!result.length) {
            await trx.rollback();
            return { success: false, message: "Category not added" };
        }

        await trx.commit();
        return { success: true, message: "Category added successfully", data: result[0] };
    } catch (error) {
        await trx.rollback();
        // logger.error(error.message);
        return { success: false, message: "Error occurred" };
    }
};


exports.updateCategory = async (categoryId, name, parent_id = null) => {
    const trx = await knexSqlDb.transaction();
    try {
        // Check if category exists
        const category = await knexSqlDb('categories')
            .where({ id: categoryId })
            .first();

        if (!category) {
            await trx.rollback();
            return { success: false, message: "Category not found" };
        }

        // Update category
        const updatedCategory = await knexSqlDb('categories')
            .transacting(trx)
            .where({ id: categoryId })
            .update({ name, parent_id })
            .returning('*');

        await trx.commit();
        return { success: true, message: "Category updated successfully", data: updatedCategory[0] };
    } catch (error) {
        await trx.rollback();
        logger.error(error.message);
        return { success: false, message: "Error occurred while updating category" };
    }
};


exports.getCategoryById = async (categoryId) => {
    try {
        // Fetch the main category
        const category = await knexSqlDb('categories')
            .where({ id: categoryId })
            .first();

        if (!category) {
            return { success: false, message: "Category not found" };
        }

        // Fetch child categories
        const childCategories = await knexSqlDb('categories')
            .where({ parent_id: categoryId });

        // Fetch products under this category
        const products = await knexSqlDb('products')
            .where({ category_id: categoryId });

        // Fetch variants for each product
        for (let product of products) {
            const variants = await knexSqlDb('variants')
                .where({ product_id: product.id });
            product.variants = variants;
        }

        // Final response structure
        return {
            success: true,
            message: "Category retrieved successfully",
            data: {
                ...category,
                childCategories,
                products
            }
        };
    } catch (error) {
        logger.error(error.message);
        return { success: false, message: "Error occurred while fetching category" };
    }
};


exports.deleteCategoryById = async (categoryId) => {
    const trx = await knexSqlDb.transaction();
    try {
        // Check if category exists
        const category = await trx('categories').where({ id: categoryId }).first();
        if (!category) {
            return { success: false, message: "Category not found" };
        }

        // Update all related records by setting `is_deleted = true`
        await trx('variants')
            .whereIn('product_id', trx('products').select('id').where({ category_id: categoryId }))
            .update({ is_deleted: true });

        await trx('products')
            .where({ category_id: categoryId })
            .update({ is_deleted: true });

        await trx('categories')
            .where({ parent_id: categoryId })
            .update({ is_deleted: true });

        await trx('categories')
            .where({ id: categoryId })
            .update({ is_deleted: true });

        // Commit transaction
        await trx.commit();

        return { success: true, message: "Category deleted successfully" };
    } catch (error) {
        await trx.rollback();
        logger.error(error.message);
        return { success: false, message: "Error occurred while soft deleting category" };
    }
};
