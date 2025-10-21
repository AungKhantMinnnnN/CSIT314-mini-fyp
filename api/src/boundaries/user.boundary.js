const express = require('express');
const router = express.Router();
const getUserInfoController = require("../controllers/user.getUserInfo.controller");
const createUserController = require("../controllers/user.create.controller");
const updateUserInfoController = require("../controllers/user.updateUserInfo.controller");
const getAllUserInfoController = require("../controllers/user.getAllUserInfo.controller");
const ChangeUserStatusController = require("../controllers/user.changeUserStatus.controller");

router.get("/getAllUserInfo", async (req, res) => {
    try{
        const result = await getAllUserInfoController.getAllUserInfo();
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

router.get("/getUserInfo", async (req,res) => {
    try{
        const { userId } = req.body;

        if (!userId){
            return res.status(400).json({
                success: false,
                message: 'UserId is required to get a user.'
            });
        }

        const result = await getUserInfoController.get(userId);
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


router.post("/create-user", async (req, res) =>  {
    try{
        const { user } = req.body;

        if (!user){
            return res.status(400).json({
                success : false,
                message : 'User object is required.'
            });
        }

        const result = await createUserController.createUser(user);
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

router.post("/update-user", async (req, res) => {
    try{
        const { user } = req.body;

        if (!user){
            return res.status(400).json({
                success: false,
                message: 'User object is required.'
            });
        }

        const result = await updateUserInfoController.updateUserInfo(user);

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

router.post("/changeUserStatus", async (req,res) => {
    try{
        const { userId, userStatusId } = req.body;

        if (!userId || !userStatusId){
            return res.status(400).json({
                success: false,
                message: "Missing userId or userStatusId."
            });
        }

        const result = await ChangeUserStatusController.changeUserStatus(userId, userStatusId);

        return res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error){
        console.error("An error has occurred. Error: ", error)
    }
})

module.exports = router;