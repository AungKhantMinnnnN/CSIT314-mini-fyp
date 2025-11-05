const express = require('express');
const router = express.Router();
const { 
    CreateUserController,
    GetAllUserInfoController,
    GetUserInfoController,
    UpdateUserInfoController,
    SuspendUserController,
    GetAllUserProfileController,
    GetProfileController,
    CreateProfileController,
    UpdateProfileController,
    SuspendProfileController
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

router.post("/getProfileInfo", async (req,res) => {
    try{
        const { profileId } = req.body;

        if (!profileId){
            return res.status(400).json({
                success: false,
                message: 'ProfileId is required to get a profile.'
            });
        }

        const controller = new GetProfileController()
        const result = await controller.get(profileId);

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

router.post("/create-profile", async (req, res) =>  {
    try{
        const { profile } = req.body;

        if (!profile){
            return res.status(400).json({
                success : false,
                message : 'Profile object is required.'
            });
        }

        const controller = new CreateProfileController()
        const result = await controller.createProfile(profile);
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

router.post("/update-profile", async (req, res) => {
    try{
        const { profile } = req.body;
        if (!profile){
            return res.status(400).json({
                success: false,
                message: 'Profile object is required.'
            });
        }

        const controller = new UpdateProfileController()
        const result = await controller.updateProfile(profile);

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

router.post("/suspend-profile", async (req,res) => {
    try{
        const { profile } = req.body;

        if (!profile.profileId || !profile.userProfileStatusId){
            return res.status(400).json({
                success: false,
                message: "Missing profileId or userProfileStatusId."
            });
        }

        const controller = new SuspendProfileController()
        const result = await controller.suspendProfile(profile);

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