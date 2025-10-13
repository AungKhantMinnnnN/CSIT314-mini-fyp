const userEntity = require('../entities/user.entity');

class AuthController {
    async login(username, password){
        const user = await userEntity.findUserWithUsernameAndPassword(username, password);
        if (!user){
            throw new Error('Invalid credentials.');
        }

        return{
            user: {
                userId : user.userId,
                username: user.username,
                email: user.email,
                roleId: user.roleId,
                statusId: user.statusId,
                isLoggedIn: true
            }
        }
    }

    async logout(user){
        return{
            user: {
                userId : user.userId,
                username: user.username,
                email: user.email,
                roleId: user.roleId,
                statusId: user.statusId,
                isLoggedIn: false
            }
        }
    }
}

module.exports = new AuthController();