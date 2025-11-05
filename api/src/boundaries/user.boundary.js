const express = require('express');
const router = express.Router();
// For old controllers
// const getUserInfoController = require("../controllers/user.getUserInfo.controller");
// const createUserController = require("../controllers/user.create.controller");
// const updateUserInfoController = require("../controllers/user.updateUserInfo.controller");
// const getAllUserInfoController = require("../controllers/user.getAllUserInfo.controller");
// const ChangeUserStatusController = require("../controllers/user.changeUserStatus.controller");

const { 
    CreateUserController,
    GetAllUserInfoController,
    GetUserInfoController,
    UpdateUserInfoController,
    SuspendUserController,
    GetAllUserProfileController
} = require("../controllers/useradmin.controller.js");


router.get("/getAllUserInfo", async (req, res) => {
    try{
        const controller = new GetAllUserInfoController()

        const result = await controller.getAllUserInfo();

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

router.post("/getUserInfo", async (req,res) => {
    try{
        const { userId } = req.body;

        if (!userId){
            return res.status(400).json({
                success: false,
                message: 'UserId is required to get a user.'
            });
        }

        const controller = new GetUserInfoController()
        const result = await controller.get(userId);

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

        const controller = new CreateUserController()
        const result = await controller.createUser(user);
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

        const controller = new UpdateUserInfoController()
        const result = await controller.updateUserInfo(user);

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

// router.post("/changeUserStatus", async (req,res) => {
//     try{
//         const { userId, userStatusId } = req.body;

//         if (!userId || !userStatusId){
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing userId or userStatusId."
//             });
//         }

//         const controller = new ChangeUserStatusController()
//         const result = await controller.changeUserStatus(userId, userStatusId);

//         return res.status(200).json({
//             success: true,
//             data: result
//         });
//     }
//     catch (error){
//         console.error("An error has occurred. Error: ", error)
//         return res.status(500).json({
//         success: false,
//         message: error.message
//     });
//     }
// })


router.post("/suspend-user", async (req,res) => {
    try{
        const { user } = req.body;

        if (!user.userId || !user.userStatusId){
            return res.status(400).json({
                success: false,
                message: "Missing userId or userStatusId."
            });
        }

        const controller = new SuspendUserController()
        const result = await controller.suspendUser(user);

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

router.get("/getAllUserProfiles", async (req, res) => {
    try{
        const controller = new GetAllUserProfileController()

        const result = await controller.getAllUserProfile();

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



module.exports = router;