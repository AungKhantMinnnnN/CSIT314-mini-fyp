const express = require('express')
const router = express.Router();

const { 
    GetAllCategoriesController,
    GetCategoryController,
    CreateCategoryController,
    UpdateCategoryController,
    SuspendCategoryController
} = require("../controllers/platform.controller.js");


router.get("/getAllCategories", async (req , res) =>{
    try{
        const controller = new GetAllCategoriesController()

        const result = await controller.GetAllCategories();

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post("/getCategory", async (req , res) => {
    try{
        const { categoryId } = req.body;

        if (!categoryId){
            return res.status(400).json({
                success: false,
                message: 'categoryId is required to get a category.'
            });
        }

        const controller = new GetCategoryController()
        const result = await controller.get(categoryId);

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post("/create-category", async (req, res) =>  {
    try{
        const { category } = req.body;

        if (!category){
            return res.status(400).json({
                success : false,
                message : 'Category object is required.'
            });
        }

        const controller = new CreateCategoryController()
        const result = await controller.createCategory(category);
        return res.status(200).json({
            success : true,
            data: result
        });
    }
    catch (error){
        console.error(error)
        return res.status(500).json({
            success : false,
            message: error.message
        })
    }
});

router.post("/update-category", async (req, res) => {
    try{
        const { category } = req.body;
        if (!category){
            return res.status(400).json({
                success: false,
                message: 'Category object is required.'
            });
        }

        const controller = new UpdateCategoryController()
        const result = await controller.updateCategory(category);

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.post("/suspend-category", async (req,res) => {
    try{
        const { category } = req.body;

        if (!category.categoryId || !category.statusId){
            return res.status(400).json({
                success: false,
                message: "Missing categoryId or statusId."
            });
        }

        const controller = new SuspendCategoryController()
        const result = await controller.suspendCategory(category);

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error){
        console.error("An error has occurred. Error: ", error)
        return res.status(500).json({
        success: false,
        message: error.message
    });
    }
})

module.exports = router;