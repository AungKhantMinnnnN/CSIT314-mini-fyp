const user = require("../entities/user.entity")

class ChangeUserStatusController {
    async changeUserStatus(userId, userStatusId){
        const updatedUser = await user.changeUserStatus(userId, userStatusId);

        if (!updatedUser){
            console.error("ChangeUserStatus(): An error has occurred.");
            return null;
        }

        return {
            updatedUser
        }
    }
}

module.exports = new ChangeUserStatusController();