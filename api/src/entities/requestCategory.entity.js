const supabase = require('../config/supabase_client');

class RequestCategory{
    constructor(){
        this.tableName = 'RequestCategory';
    }

    async getAllRequestCategories(){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`*`);
        
        console.log("getAllRequestCategories(): Response from database: ", data);

        if(error){
            console.error("getAllRequestCategories(): An error has occurred.", error);
        }

        return data;
    }
}

module.exports = RequestCategory;