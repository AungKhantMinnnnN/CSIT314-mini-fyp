const Category = require("../entities/platform.entity")

class GetAllCategoriesController {
    async GetAllCategories(){
        const categoryEntity = new Category();
        const categories = await categoryEntity.getAllCategories();
        if (!categories){
            console.error("An error has occurred.");
            return null;
        }

        return {
            categories
        }
    }
}

class SearchCategoryController {
    async searchCategory(search){
        const categoryEntity = new Category();
        const categories = await categoryEntity.searchCategory(search);
        if (!categories){
            console.error("An error has occured.");
            return null;
        }

        return {
            categories
        }
    }
}

class GetCategoryController{
    async get(categoryId){
        const categoryEntity = new Category();
        const category = await categoryEntity.getCategory(categoryId);

        if (!category){
            console.error("user.getUserInfo.Controller.get(): No valid user is found.");
            return {
                category : {
                    categoryId : "",
                    Name : "",
                    Description: "",
                    statusId: "",
                    createdUser : "",
                }
            }
        }

        return {
            category : {
                    categoryId : category.categoryId,
                    Name : category.Name,
                    Description: category.Description,
                    statusId: category.statusId,
                    createdUser : category.createdUser,
                }
        }
    }
}

class CreateCategoryController{
    async createCategory(category){
        const categoryEntity = new Category();
        const createdCategory = await categoryEntity.createCategory(category);

        if (!createdCategory){
            console.error("platform.createCategory.Controller.createCategory(): Invalid category object.");
            return {
                category : {
                    Name: "",
                    isCategoryCreated: false
                }
            }
        }

        return {
            createdCategory,
            isCategoryCreated : true
        }
    }
}

class UpdateCategoryController{
    async updateCategory(category){
        const categoryEntity = new Category();
        const updatedCategory = await categoryEntity.updateCategory(category);

        if (!updatedCategory){
            console.error("platform.updateCategory.Controller.updateCategory(): Invalid category object.");
            return {
                category : {
                    Name: "",
                    isCategoryUpdated: false
                }
            }
        }

        return {
            updatedCategory,
            isCategoryUpdated : true
            }
        }
}

class SuspendCategoryController{
    async suspendCategory(category){
        if (category.statusId == 1){
            const suspendedId = 2
            const categoryEntity = new Category();
            const updatedCategory = await categoryEntity.changeCategoryStatus(category.categoryId, suspendedId);
            return {
                category : {
                    Name: updatedCategory.Name,
                    isCategorySuspended: true
                }
            }
        }
        
        else if (category.statusId == 2){
            console.error("platfrom.SuspendCategory.Controller.changeCategoryStatus(): Category is already suspended");
            return {
                category : {
                    Name: "",
                    isCategorySuspended: false
                },
                message: "Category is already suspended"
            }
        }

        else {
            console.error("SuspendCategoryController.suspendCategory(): Invalid category status");
            return {
                category: {
                    Name: "",
                    isCategorySuspended: false
                }
            };
        }
    }
}

module.exports = {
    GetAllCategoriesController,
    SearchCategoryController,
    GetCategoryController,
    CreateCategoryController,
    UpdateCategoryController,
    SuspendCategoryController,
}