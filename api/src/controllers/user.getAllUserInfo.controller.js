const user = require("../entities/user.entity")

class getAllUserInfoController {
    async getAllUserInfo(){
        const userInfo = await user.getAllUserInfo();
        if (!userInfo){
            console.error("An error has occurred.");
            return null;
        }

        return {
            userInfo
        }
    }
}

module.exports = new getAllUserInfoController();