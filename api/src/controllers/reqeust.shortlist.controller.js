const shortlistEntity = require("../entities/request.shortlist.entity")

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
    async addShortlist(shortlist){

        const entity = new shortlistEntity();
        const response = await entity.addShortlist(shortlist);

        if(!response){
            console.error("An error has occurred.");
            return null;
        }

        return response;
    }
}

module.exports = {
    GetAllShortlistController,
    AddShortlistController
}