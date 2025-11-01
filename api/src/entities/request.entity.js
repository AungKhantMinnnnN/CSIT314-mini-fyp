const supabase = require('../config/supabase_client');

class Request{
    constructor() {
        this.tableName = 'Request';
    }

    async getAllRequests(){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                *,
                User(userId, username),
                Category(categoryId, categoryName),
                Status(statusId, statusName)
                `)
            .maybeSingle();

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
                Category(categoryId, categoryName),
                Status(statusId, statusName)
                `)
            .eq('requestId', requestId)
            .maybeSingle();

            console.log("getRequestInfo(): Response from database: ", data.length);

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
                Category(categoryId, categoryName),
                Status(statusId, statusName)
                `)
            .maybeSingle();
        
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
            .eq('requestId', request.requestId)
            .select(`
                *,
                User(userId, username),
                Category(categoryId, categoryName),
                Status(statusId, statusName)
            `)
            .maybeSingle();

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
                updatedDate: Date.now
            })
            .eq('requestId', requestId)
            .select(`
                *,
                User(userId, username),
                Category(categoryId, categoryName),
                Status(statusId, statusName)
                `)
            .maybeSingle();

            console.log("deleteRequest(): Response from database: ", data);

            if (error){
                console.error("deleteRequest(): An error has occurred: ", error.message);
            }

            return data;
    }
}

module.exports = Request;