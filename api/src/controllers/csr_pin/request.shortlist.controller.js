const shortlistEntity = require("../../entities/csr_pin/request.shortlist.entity")

class GetAllShortlistController{
    async getAllShortlist(userId){

        const entity = new shortlistEntity();
        const response = await entity.getAllShortlistRequests(userId);

        if(!response){
            console.error("An error has occurred.");
            return null;
        }

        return response;
    }
}

class AddShortlistController{
    async addShortlist(csrUserId, shortlist){

        const entity = new shortlistEntity();
        const response = await entity.addShortlist(csrUserId, shortlist);

        if(!response){
            console.error("An error has occurred.");
            return null;
        }

        return response;
    }
}

class SearchShortlistController{
    async searchShortlist(searchQuery, userId){
        const entity = new shortlistEntity();
        const response = await entity.searchShortlist(searchQuery, userId);

        if(!response){
            console.error("An error has occurred.");
            return null;
        }

        return response;
    }
}

module.exports = {
    GetAllShortlistController,
    AddShortlistController,
    SearchShortlistController
}