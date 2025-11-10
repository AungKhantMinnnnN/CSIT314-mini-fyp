// const express = require('express')
// const router = express.Router();

// const {
//     GetAllRequestCategoriesController
// } = require('../controllers/request.category.controller')

// router.get("/getAllCategories", async (req, res) => {
//     try{
//         const controller = new GetAllRequestCategoriesController();
//         const result = await controller.getAllRequestCategories();

//         if(!result){
//             return res.status(400).json({
//                 success: false,
//                 data: null
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: result
//         });
//     }
//     catch(error){
//         console.error(error);

//         return res.status(500).json({
//             success: false,
//             data: null
//         })
//     }
// })

// module.exports = router;