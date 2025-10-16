const auth = require('../entities/auth.entity');

class AuthController {
    async login(username, password, roleId){
        const validUser = await auth.login(username, password, roleId);

        if (!validUser){
            console.error("Auth.Controller.Login(): Invalid credentials.");
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
                roleId: validUser.roleId,
                statusId: validUser.statusId,
                isLoggedIn: true
            }
        }
    }
}

module.exports = new AuthController();