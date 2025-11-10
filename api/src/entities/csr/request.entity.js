const supabase = require('../../config/supabase_client');
const getRandomId = require('../../utils/randomId');


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

            return data;
    }

    async createRequest(request){
        
        const requestId = getRandomId(1000, 9999);

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                requestId: requestId,
                pinUserId: request.userId,
                categoryId: request.categoryId,
                title: request.title,
                description: request.description,
                status: 1,
                viewCount: 0,
                shortlistCount: 0
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
                status: 1
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
        const nowIso = new Date().toISOString(); 
        const { data, error } = await supabase
            .from(this.tableName)
            .update({
                updatedDate: nowIso,
                deletedDate: nowIso
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

    async searchRequest(searchQuery){
        try{
            const trimmedQuery = searchQuery?.trim();
            if(!trimmedQuery) return [];

            const pattern = `%${trimmedQuery}%`;
            const isNumber = !isNaN(Number(trimmedQuery));
            if (isNumber) {
                orConditions.push(`requestId.eq.${trimmedQuery}`);
            }

            const { data, error } = await supabase
                .from(this.tableName)
                .select(`
                    *,
                    RequestCategory(categoryId, Name, Description),
                    RequestStatus(statusId, statusName)`);

            console.log("searchRequest(): Response from database: ", data);

            return data;
        }
        catch (error){
            console.error("searchRequest(): An error has occurred: ", error.message);
            return [];
        }
    }
}

module.exports = Request;