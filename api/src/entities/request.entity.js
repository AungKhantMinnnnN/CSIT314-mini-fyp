const supabase = require('../config/supabase_client');

class Request{
    constructor() {
        this.tableName = 'Request';
    }

    async getAllRequestsForUser(userId){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                *,
                User(userId, username),
                RequestCategory(categoryId, Name),
                RequestStatus(statusId, statusName)`)
            .eq('pinUserId', userId)
            .is('deletedDate', null);

        console.log("getAllRequestsForUser(): Response from database: ", data.length);

        if (error){
            console.error("getAllRequestsForUser(): An error has occurred: ", error.message);
        }

        return data;
    }

    async getAllRequests(){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                *,
                User(userId, username),
                RequestCategory(categoryId, Name),
                RequestStatus(statusId, statusName)
                `)
            .is('deletedDate', null);

        console.log("getAllRequests(): Response from database: ", data.length);

        if (error){
            console.error("getAllRequests(): An error has occurred: ", error.message);
        }

        return data;
    }

    async getRequestInfo(requestId){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                *,
                User(userId, username),
                RequestCategory(categoryId, Name),
                RequestStatus(statusId, statusName)
                `)
            .is('deletedDate', null)
            .eq('requestId', requestId);

            console.log("getRequestInfo(): Response from database: ", data);

            if (error){
                console.log("getRequestInfo(): An error has occurred: ", error.message);
            }
    }

    async createRequest(request){
        
        const currentRequests = await this.getAllRequests();
        const requestId = currentRequests.length + 1;

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                requestId: requestId,
                pinUserId: request.pinUserId,
                categoryId: request.categoryId,
                title: request.title,
                description: request.description,
                status: 1,
                viewCount: 0,
                shortListCount: 0
            }])
            .select(`
                *,
                User(userId, username),
                RequestCategory(categoryId, Name),
                RequestStatus(statusId, statusName)
            `);
        
        console.log("createRequest(): Response from database: ", data);

        if (error){
            console.error("createRequest(): An error has occurred: ", error.message);
        }

        return data;
    }

    async updateRequestInfo(request){
        const { data, error } = await supabase
            .from(this.tableName)
            .update({
                title: request.title,
                description: request.description,
                status: 1,
                viewCount: request.viewCount,
                shortListCount: request.shortListCount
            })
            .is('deletedDate', null)
            .eq('requestId', request.requestId)
            .select(`
                *,
                User(userId, username),
                RequestCategory(categoryId, Name),
                RequestStatus(statusId, statusName)
            `);

        console.log("updateRequestInfo(): Response from database: ", data);

        if (error){
            console.error("updateRequestInfo(): An error has occurred: ", error.message);
        }

        return data;
    }

    async deleteRequest(requestId){
        const { data, error } = await supabase
            .from(this.tableName)
            .update({
                updatedDate: Date.now,
                deletedDate: Date.now
            })
            .eq('requestId', requestId)
            .select(`
                *,
                User(userId, username),
                RequestCategory(categoryId, Name),
                RequestStatus(statusId, statusName)
            `);

            console.log("deleteRequest(): Response from database: ", data);

            if (error){
                console.error("deleteRequest(): An error has occurred: ", error.message);
            }

            return data;
    }
}

module.exports = Request;