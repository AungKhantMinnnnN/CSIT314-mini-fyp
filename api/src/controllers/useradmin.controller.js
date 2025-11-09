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
            createdUser
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

class SearchUserInfoController {
    async searchUserInfo(search){
        const userEntity = new User();
        const userInfo = await userEntity.searchUserInfo(search);
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
            updatedUserInfo,
            isUserUpdated : true
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
    
class GetAllUserProfileController {
    async getAllUserProfile(){
        const userEntity = new User();
        const userProfiles = await userEntity.getAllUserProfile();
        if (!userProfiles){
            console.error("An error has occurred.");
            return null;
        }

        return {
            userProfiles
        }
    }
}

class SearchUserProfileController {
    async searchUserProfile(search){
        const userEntity = new User();
        const userProfiles = await userEntity.searchUserProfile(search);
        if (!userProfiles){
            console.error("An error has occurred.");
            return null;
        }

        return {
            userProfiles
        }
    }
}

class GetProfileController{
    async get(profileId){
        const userEntity = new User();
        const profileInfo = await userEntity.getProfileInfo(profileId);

        if (!profileInfo){
            console.error("user.getProfile.Controller.get(): No valid profile is found.");
            return {
                userProfile : {
                    profileId: "",
                    createdDate: "",
                    updatedDate: "",
                    roleName: "",
                    description: "",
                    userProfileStatusId: ""
                }
            }
        }
        
        return {
            userProfile : profileInfo
        }
    }
}

class CreateProfileController{
    //Create Profile
    async createProfile(profile){
        const userEntity = new User();
        const createdProfile = await userEntity.createProfile(profile);

        if (!createdProfile){
            console.error("user.create.Controller.createProfile(): Invalid profile object.");
            return {
                profile : {
                    roleName: "",
                    isProfileCreated: false
                }
            }
        }

        return {
            createdProfile,
            isProfileCreated : true
        }
    }
}

class UpdateProfileController{
    async updateProfile(profile){
        const userEntity = new User();
        const updatedProfile = await userEntity.updateProfile(profile);

        if (!updatedProfile){
            console.error("user.updateProfile.Controller.updateProfile(): Invalid profile object.");
            return {
                userProfile : {
                    roleName: "",
                    isProfileUpdated: false
                }
            }
        }

        return {
            userProfile: updatedProfile,
            isProfileUpdated : true
            }
        }
}

class SuspendProfileController{
    async suspendProfile(profile){
        if (profile.userProfileStatusId == 1){
            const suspendedId = 2
            const userEntity = new User();
            const updatedProfile = await userEntity.changeProfileStatus(profile.profileId, suspendedId);
            return {
                userProfile : {
                    roleName: updatedProfile.roleName,
                    isProfileSuspended: true
                }
            }
        }
        
        else if (profile.userProfileStatusId == 2){
            console.error("user.SuspendProfile.Controller.changeProfileStatus(): User is already suspended");
            return {
                userProfile : {
                    roleName: "",
                    isProfileSuspended: false
                },
                message: "Profile is already suspended"
            }
        }

        else {
            console.error("SuspendProfileController.suspendUser(): Invalid profile status");
            return {
                userProfile: {
                    roleName: "",
                    isProfileSuspended: false
                }
            };
        }
    }
}


module.exports = {
    CreateUserController,
    GetAllUserInfoController,
    SearchUserInfoController,
    GetUserInfoController,
    UpdateUserInfoController,
    SuspendUserController,
    GetAllUserProfileController,
    SearchUserProfileController,
    GetProfileController,
    CreateProfileController,
    UpdateProfileController,
    SuspendProfileController
}