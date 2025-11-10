const supabase = require('../../config/supabase_client');

class Category{
    constructor(){
        this.tableName = 'RequestCategory';
    }

    async getAllCategories(){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                *
            `);
        
        console.log("GetAllCategories(): Response from database: ", data.length);

        if (error){
            console.error("GetAllUserInfo(): An error has occurred. Error: ", error)
        }

        return data;
    }

    async searchCategory(query) {
        try {
            const trimmedQuery = query?.trim();
            if (!trimmedQuery) return [];

            const pattern = `%${trimmedQuery}%`;
            const isNumber = !isNaN(Number(trimmedQuery));

            const orConditions = [
                `Name.ilike.${pattern}`,
                `Description.ilike.${pattern}`
            ];

            if (isNumber) {
                orConditions.push(`categoryId.eq.${trimmedQuery}`);
            }
            const { data, error } = await supabase
                .from(this.tableName)
                .select("*")
                .or(orConditions.join(","));

            if (error) {
                console.error("searchCategory(): Database error:", error.message);
                return [];
            }
            return data;
        } catch (err) {
            console.error("searchCategory(): Unexpected error:", err);
            return [];
        }
    }

    async getCategory(categoryId){
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('categoryId', categoryId)
            .maybeSingle();

        console.log("GetCategory(): response from database: ", data);
        
        if (error){
            console.error("GetCategoryInfo(): An error has occurred. Error: ", error);
        }

        return data;
    }

    async createCategory(category){
        const currentCategory = await this.getAllCategories();
        const categoryId = currentCategory.length + 1;

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                categoryId: categoryId,
                updatedDate: Date.now,
                Name: category.Name,
                Description: category.Description,
                statusId: 1
            }])
            .select('*')
            .maybeSingle();

        console.log("createCategory(): response from database: ", data);

        if (error){
            console.error("createCategory(): An error has occurred. Error: " + error.message);
        }

        return data;
    }

    async updateCategory(category){
        const { data, error } = await supabase
            .from(this.tableName)
            .update({
                updatedDate: Date.now,
                Name: category.Name,
                Description: category.Description,
                statusId: category.statusId
            })
            .eq('categoryId', category.categoryId)
            .select('*')
            .maybeSingle();

        console.log("updateCategory(): response from database: ", data);

        if (error){
            console.error("updateCategory(): An error has occurred. Error: ", error);
        }

        return data;
    }

    async changeCategoryStatus(categoryId, categoryStatus){
        const { data, error} = await supabase
            .from(this.tableName)
            .update({
                statusId : categoryStatus
            })
            .eq('categoryId', categoryId)
            .select();
        
        console.log("ChangeCategoryStatus(): Response from database: ", data);
        
        if (error){
            console.error("ChangeCategoryStatus(): An error has occurred. Error: " + error.message);
        }
        
        return data;
    }
}

module.exports = Category;