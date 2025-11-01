const Request = require("../entities/request.entity")

class CreateRequestController {
    async createRequest(request){
        const requestEntity = new Request();
        const createdRequest = await requestEntity.createRequest(request);

        if (!createdRequest){
            console.error("Request.Controller.createRequest(): An error has occurred.");
            return null;
        }

        return{
            createdRequest
        }
    }
}

class GetAllRequestController {
    async getAllRequest(){
        const requestEntity = new Request();
        const requests = await requestEntity.getAllRequests();

        if (!requests){
            console.error("Request.Controller.getAllRequests(): An error has occurred.");
            return null;
        }

        return {
            requests
        }
    }
}

class GetRequestInfoController {
    async getRequestInfo(requestId){
        const requestEntity = new Request();
        const requestInfo = await requestEntity.getRequestInfo(requestId);

        if (!requestInfo){
            console.error("Request.Controller.getRequestInfo(): An error has occurred.");
            return null;
        }

        return {
            requestInfo
        }
    }
}

class UpdateRequestInfoController {
    async updateRequestInfo(request){
        const requestEntity = new Request();
        const updateRequestInfo = await requestEntity.updateRequestInfo(request);

        if (!updateRequestInfo){
            console.error("Request.Controller.updateRequestInfo(): An error has occurred.");
            return null;
        }

        return {
            updateRequestInfo
        }
    }
}

class DeleteRequestController{
    async deleteRequest(requestId){
        const requestEntity = new Request();
        const deletedRequest = await requestEntity.deleteRequest(requestId);

        if(!deletedRequest){
            console.error("Request.Controller.deleteRequest(): An error has occurred.");
            return null;
        }

        return {
            deletedRequest
        }
    }
}

module.exports = {
    CreateRequestController,
    GetAllRequestController,
    GetRequestInfoController,
    UpdateRequestInfoController,
    DeleteRequestController
}