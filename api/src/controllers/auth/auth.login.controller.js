const Auth = require('../../entities/auth/auth.entity');

class AuthLoginController {
    async login(username, password){

        const authEntity = new Auth()
        const validUser = await authEntity.login(username, password);

        if (!validUser){
            const error = new Error("Invalid credentials");
            throw error;
        }

        return{
            user: {
                userId: validUser.userId,
                username: validUser.username,
                email: validUser.email,
                userProfileId: validUser.userProfileId,
                userStatusId: validUser.userStatusId,
                success: true
            }
        }
    }
}

module.exports = AuthLoginController;