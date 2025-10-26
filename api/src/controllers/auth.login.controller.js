const Auth = require('../entities/auth.entity');

class AuthLoginController {
    async login(username, password){

        const authEntity = new Auth()
        const validUser = await authEntity.login(username, password);

        if (!validUser){
            console.error("Auth.Login.Controller.Login(): Invalid credentials.");
            return {
                user: {
                    userId: "",
                    username: "",
                    email: "",
                    roleId: "",
                    statusId: "",
                    isLoggedIn: false
                }
            }
        }

        return{
            user: {
                userId: validUser.userId,
                username: validUser.username,
                email: validUser.email,
                userProfileId: validUser.userProfileId,
                statusId: validUser.statusId,
                isLoggedIn: true
            }
        }
    }
}

module.exports = AuthLoginController;