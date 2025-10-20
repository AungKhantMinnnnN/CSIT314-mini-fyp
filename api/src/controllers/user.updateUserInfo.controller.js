const user = require("../entities/user.entity")

class updateUserInfoController{
    async updateUserInfo(user){
        const updatedUserInfo = await user.updateUserInfo(user);

        if (!updatedUserInfo){
            console.error("user.updateUserInfo.Controller.updateUserInfo(): Invalid user object.");
            return {
                user : {
                    username: "",
                    isUserUpdated: false
                }
            }
        }

        return {
            user : {
                username : createdUser.username,
                isUserUpdated : true
            }
        }
    }
}