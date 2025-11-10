const Request = require("../../entities/pin/request.entity")

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

class GetAllRequestsForUserController {
    async getAllRequestsForUser(userId){
        const requestEntity = new Request();
        const requests = await requestEntity.getAllRequestsForUser(userId);

        if (!requests){
            console.error("Request.Controller.getAllRequestsForUser(): An error has occurred.");
            return null;
        }

        return {
            requests
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

class CSRSearchRequestController{
    async searchRequest(searchQuery){
        const requestEntity = new Request();
        const result = await requestEntity.CSRSearchRequest(searchQuery);

        if(!result){
            console.error("Request.CSRSearchRequestController.searchRequest(): An error has occurred.");
            return null;
        }

        return {
            result
        }
    }
}

class PINSearchRequestController{
    async searchRequest(searchQuery, userId){
        const requestEntity = new Request();
        const result = await requestEntity.PINSearchRequest(searchQuery, userId);

        if(!result){
            console.error("Request.PINSearchRequestController.searchRequest(): An error has occurred.");
            return null;
        }
        
        return {
            result
        }
    }
}

module.exports = {
    CreateRequestController,
    GetAllRequestController,
    GetRequestInfoController,
    UpdateRequestInfoController,
    DeleteRequestController,
    GetAllRequestsForUserController,
    CSRSearchRequestController,
    PINSearchRequestController
}