const RequestCategory = require("../entities/old-request.category.entity");

class GetAllRequestCategoriesController{
    async getAllRequestCategories(){
        const entity = new RequestCategory();

        const response = await entity.getAllRequestCategories();

        if(!response){
            console.error("GetAllRequestCategoriesController.getAllRequestCategories(): An error has occurred");
            return null;
        }

        return response;
    }
}

module.exports = {
    GetAllRequestCategoriesController
}