const supabase = require('../../config/supabase_client');

class CompletedRequest{

    constructor(){
        this.tableName = "CompletedRequest";
    }

    async getAllCompletedRequest(userId){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                *,
                Request(requestId, title, description, status, pinUserId, viewCount, shortlistCount, categoryId,
                RequestCategory:RequestCategory(categoryId, Name, Description)
                ),
                pinUser:User!CompletedRequest_PinUserId_fkey(userId, username),
                csrUser:User!CompletedRequest_CsrUserId_fkey(userId, username)
                `)
            .eq('CsrUserId', userId);

            console.log("GetAllCompletedRequest(): Response from database: ", data);

            if(error){
                console.error("GetAllCompletedRequest(): An error has occurred: ", error);
                return [];
            }
        return data;
    }

    async searchCompletedRequest(searchQuery, userId){
        try{
            const trimmedQuery = searchQuery?.trim();
            if (!trimmedQuery) return [];

            const pattern = `%${trimmedQuery}%`;
            const isNumber = !isNaN(Number(trimmedQuery));
            if (isNumber) {
                orConditions.push(`completedId.eq.${trimmedQuery}`);
            }

            const { data, error } = await supabase
                .from(this.tableName)
                .select(`
                    *,
                    Request(requestId, title, description, status, pinUserId, viewCount, shortlistCount, categoryId,
                    RequestCategory:RequestCategory(categoryId, Name, Description)
                    ),
                    pinUser:User!CompletedRequest_PinUserId_fkey(userId, username),
                    csrUser:User!CompletedRequest_CsrUserId_fkey(userId, username)
                `)
                .eq('CsrUserId', userId)  // ✅ keep filtering by CSR
                .not('Request', 'is', null)  // ✅ remove null Request records
                .or(`title.ilike.%${pattern}%,description.ilike.%${pattern}%`, { foreignTable: 'Request' });

            console.log("searchCompletedRequest(): Response from database: ", data);

            if(error){
                console.error("SearchCompletedRequest(): An error has occurred: ", error);
                return [];
            }

            return data;

        }
        catch (e){
            console.error("SearchCompletedRequest(): An error has occurred: ", e);
            return [];
        }
    }
}

module.exports = CompletedRequest;