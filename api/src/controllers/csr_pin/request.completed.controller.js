const completedRequestEntity = require("../../entities/pin/request.completed.entity")

class GetAllCompletedRequestController{
    async getAllCompletedRequest(userId){
        const entity = new completedRequestEntity();
        const result = await entity.getAllCompletedRequest(userId);

        if(!result){
            console.error("An error has occurred.");
            return null;
        }

        return result;
    }
}

class SearchCompletedRequestController{
    async searchCompletedRequest(searchQuery, userId){
        const entity = new completedRequestEntity();
        const result = await entity.searchCompletedRequest(searchQuery, userId);

        if(!result){
            console.error("An error has occurred.");
            return null;
        }

        return result;
    }
}


module.exports = {
    GetAllCompletedRequestController,
    SearchCompletedRequestController
}