const express = require('express')
const router = express.Router();

const [
    CreateRequestController,
    GetAllRequestController,
    GetRequestInfoController,
    UpdateRequestInfoController,
    DeleteRequestController
] = require("../controllers/request.controller")

router.get("/getAllRequest", async (req, res) => {
    try{
        const controller = new GetAllRequestController();

        const result = await controller.getAllRequest();

        if (!result){
            return res.status(400).json({
                success: false,
                data: null
            });
        }

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
})

router.post("/getRequestInfo", async (req, res) => {
    try{
        const { requestId } = req.body;

        const controller = new GetRequestInfoController();

        const result = await controller.getRequestInfo(requestId);

        if(!result){
            return res.status(400).json({
                success: false,
                data: null
            });
        }

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
})

router.post("/createRequest", async (req, res) => {
    try{
        const { request } = req.body;

        if (!request){
            return res.status(400).json({
                success: false,
                message: 'Request Object is required.'
            });
        }

        const controller = new CreateRequestController();
        const result = await controller.createRequest(request);

        if(!result){
            return res.status(400).json({
                success: false,
                message: null
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.mesasge
        })
    }
})

router.post("/updateRequest", async (req, res) => {
    try{
        const { request } = req.body;

        if (!request){
            return res.status(400).json({
                success: false,
                message: 'Request Object is required.'
            });
        }

        const controller = new UpdateRequestInfoController();
        const result = await controller.updateRequestInfo(request);

        if(!result){
            return res.status(400).json({
                success: false,
                data: null
            });
        }

        return res.status(500).json({
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
})

router.post("/deleteRequest", async (req, res) => {
    try{
        const { requestId } = req.body;

        if(!requestId){
            return res.status(400).json({
                success: false,
                data: null
            });
        }

        const controller = new DeleteRequestController();
        const result = await controller.deleteRequest(requestId);

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error){
        console.error("An error has occurred. Error: ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

module.exports = router;