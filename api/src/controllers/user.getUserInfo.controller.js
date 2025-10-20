const user = require("../entities/user.entity")

class GetUserInfo{
    async get(userId){
        const userInfo = await user.getUserInfo(userId);

        if (!userInfo){
            console.error("user.getUserInfo.Controller.get(): No valid user is found.");
            return {
                user : {
                    username : "",
                    password: "",
                    firstName : "",
                    lastName : "",
                    email: "",
                    phoneNumber : "",
                    role : 0
                }
            }
        }

        return {
            user : {
                username : userInfo.username,
                password: userInfo.password,
                firstName : userInfo.firstName,
                lastName : userInfo.lastName,
                email: userInfo.email,
                phoneNumber : userInfo.phoneNumber,
                role : userInfo.roleId
            }
        }
    }
}