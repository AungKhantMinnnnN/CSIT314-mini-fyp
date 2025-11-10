const express = require('express')
const router = express.Router();

const {
    GetAllCompletedRequestController,
    SearchCompletedRequestController
} = require("../../controllers/csr_pin/request.completed.controller")

router.get("/getAllCompletedRequest/:userId", async (req, res) => {
    try{
        const { userId } = req.params;

        const controller = new GetAllCompletedRequestController();
        const response = await controller.getAllCompletedRequest(userId);

        if(!response){
            return res.status(400).json({
                success: false, 
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            data: response
        });
    }
    catch (e){
        console.error(e);
        return res.status(500).json({
            success: false,
            data: null
        });
    }
})

router.get("/searchCompletedRequest", async (req, res) => {
    try{
        const { searchQuery, userId } = req.query;

        const controller = new SearchCompletedRequestController();
        const response = await controller.searchCompletedRequest(searchQuery, userId);

        if(!response){
            return res.status(400).json({
                success: false,
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            data: response
        });
    }
    catch (e){
        console.error(e);
        return res.status(500).json({
            success: false,
            data: null
        });
    }
})

module.exports = router;