const user = require("../entities/user.entity")

class createUserController{
    async createUser(userData){
        const createdUser = await user.createUser(userData);

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

module.exports = new createUserController();