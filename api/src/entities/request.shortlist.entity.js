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
                Request(requestId, title, description, status, pinUserId, viewCount, shortlistCount, categoryId),
                pinUser:User!ShortListedRequest_pinUserId_fkey(userId, username),
                csrUser:User!ShortListedRequest_csrUserId_fkey(userId, username)`
            )
            .eq('csrUserId', userId);

            console.log("getAllShortlistRequests(): response from database: ", data.length);

            if(error){
                console.error("getAllShortlistRequests(): An error has occurred: ", error);
            }

            return data;
    }

    async addShortlist(csrUserId, shortlist){

        const shortlistId = getRandomId(1000, 9999);

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                shortlistId: shortlistId,
                requestId: shortlist.requestId,
                pinUserId: shortlist.pinUserId,
                csrUserId: csrUserId,
                notes: shortlist.notes
            }])
            .eq('shortlistId', shortlist.id)
            .select(`
                *,
                Request(requestId, title, description, status, pinUserId, viewCount, shortlistCount, categoryId),
                pinUser:User!ShortListedRequest_pinUserId_fkey(userId, username),
                csrUser:User!ShortListedRequest_csrUserId_fkey(userId, username)
                `);

            console.log("addShortlist(): Response from database: ", data);

            if(error){
                console.error("addShortlist(): An error has occurred: ", error);
            }

        return data;
    }

    async searchShortlist(query, userId){
        try{
            const trimmedQuery = query?.trim();
            if (!trimmedQuery) return [];

            const pattern = `%${trimmedQuery}%`;
            const isNumber = !isNaN(Number(trimmedQuery));
            if (isNumber) {
                orConditions.push(`shortlistId.eq.${trimmedQuery}`);
            }

            const { data, error } = await supabase
                .from("ShortListedRequest")
                .select(`
                    *,
                    Request(requestId, title, description, status, pinUserId, viewCount, shortlistCount, categoryId),
                    pinUser:User!ShortListedRequest_pinUserId_fkey(userId, username),
                    csrUser:User!ShortListedRequest_csrUserId_fkey(userId, username)
                `)
                .eq('csrUserId', userId)  // ✅ keep filtering by CSR
                .not('Request', 'is', null)  // ✅ remove null Request records
                .or(`title.ilike.%${pattern}%,description.ilike.%${pattern}%`, { foreignTable: 'Request' });

            console.log("searchShortlist(): Response from database: ", data);

            if(error){
                console.error("searchShortlist(): An error has occurred: ", error);
                return [];
            }

            return data;

        }
        catch (e){
            console.error("searchShortlist(): An error has occurred: ", e);
            return [];
        }
    }
}

module.exports = RequestShortlist;