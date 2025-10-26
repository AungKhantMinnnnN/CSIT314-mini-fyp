const User = require("../entities/user.entity")

//Controller Classes for User Admin

class CreateUserController{
    //Create Users
    async createUser(user){
        const userEntity = new User();
        const createdUser = await userEntity.createUser(user);

        if (!createdUser){
            console.error("user.create.Controller.createUser(): Invalid user object.");
            return {
                user : {
                    username: "",
                    isUserCreated: false
                }
            }
        }

        return {
            user : {
                username : createdUser.username,
                isUserCreated : true
            }
        }
    }
}



class GetAllUserInfoController {
    async getAllUserInfo(){
        const userEntity = new User();
        const userInfo = await userEntity.getAllUserInfo();
        if (!userInfo){
            console.error("An error has occurred.");
            return null;
        }

        return {
            userInfo
        }
    }
}



class GetUserInfoController{
    async get(userId){
        const userEntity = new User();
        const userInfo = await userEntity.getUserInfo(userId);

        if (!userInfo){
            console.error("user.getUserInfo.Controller.get(): No valid user is found.");
            return {
                user : {
                    userId : "",
                    username : "",
                    password: "",
                    firstName : "",
                    lastName : "",
                    email: "",
                    phoneNumber : "",
                    userProfileId : "",
                    userStatusId : ""
                }
            }
        }

        return {
            user : {
                userId : userInfo.userId,
                username : userInfo.username,
                password: userInfo.password,
                firstName : userInfo.firstName,
                lastName : userInfo.lastName,
                email: userInfo.email,
                phoneNumber : userInfo.phoneNumber,
                userProfileId : userInfo.userProfileId,
                userStatusId : userInfo.userStatusId
            }
        }
    }
}



class UpdateUserInfoController{
    async updateUserInfo(user){
        const userEntity = new User();
        const updatedUserInfo = await userEntity.updateUserInfo(user);

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
                username : updatedUserInfo.username,
                isUserUpdated : true
            }
        }
    }
}



class SuspendUserController{
    async suspendUser(user){
        if (user.userStatusId == 1){
            const suspendedId = 2
            const userEntity = new User();
            const updatedUserInfo = await userEntity.changeUserStatus(user.userId, suspendedId);
            return {
                user : {
                    username: updatedUserInfo.username,
                    isUserSuspended: true
                }
            }
        }
        
        else if (user.userStatusId == 2){
            console.error("user.SuspendUser.Controller.changeUserStatus(): User is already suspended");
            return {
                user : {
                    username: "",
                    isUserSuspended: false
                },
                message: "User is already suspended"
            }
        }

        else {
            console.error("SuspendUserController.suspendUser(): Invalid user status");
            return {
                user: {
                    username: "",
                    isUserSuspended: false
                }
            };
        }
    }
}
    


module.exports = {
    CreateUserController,
    GetAllUserInfoController,
    GetUserInfoController,
    UpdateUserInfoController,
    SuspendUserController
}