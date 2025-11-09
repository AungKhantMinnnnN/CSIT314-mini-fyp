const supabase = require('../config/supabase_client');
const getRandomId = require('../utils/randomId');

class RequestShortlist{
    constructor(){
        this.tableName = "ShortListedRequest";
    }

    async getAllShortlistRequests(userId){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(
                `*,
                Request(requestId, title, description, status, csrUserId, viewCount, shortlistCount, category),
                RequestStatus(statusId, statusName),
                User(userId, username)`
            )
            .eq('csrUserId', userId);

            console.log("getAllShortlistRequests(): response from database: ", data.length);

            if(error){
                console.error("getAllShortlistRequests(): An error has occurred: ", error);
            }
    }

    async addShortlist(shortlist){
        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                requestId: shortlist.requestId,
                pinUserId: shortlist.pinUserId,
                csrUserId: shortlist.csrUserId,
                notes: shortlist.notes
            }])
            .eq('shortlistId', shortlist.id)
            .select(`
                *,
                Request(requestId, title, description. status, csrUserId, viewCount, shortlistCount, category),
                RequestStatus(statusId, statusName),
                User(userId, username)
                `);

            console.log("addShortlist(): Response from database: ", data);

            if(error){
                console.error("addShortlist(): An error has occurred: ", error);
            }
    }
}

module.exports = RequestShortlist;