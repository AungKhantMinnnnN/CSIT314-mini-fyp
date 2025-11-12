const supabase = require('../../config/supabase_client');
const getRandomId = require('../../utils/randomId');

class User{
    constructor(){
        this.tableName = 'User';
    }

    async getAllUserInfo(){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                *,
                Status(statusId, statusName),
                UserProfile(profileId, roleName)
            `);
        
        console.log("GetAllUserInfo(): Response from database: ", data.length);

        if (error){
            console.error("GetAllUserInfo(): An error has occurred. Error: ", error)
        }

        return data;
    }

    async searchUserInfo(query) {
        try {
            // Sanitize query input
            const trimmedQuery = query?.trim();
            if (!trimmedQuery) {
            console.warn("searchUser(): Empty query provided.");
            return [];
            }

            // Build search pattern (case-insensitive)
            const pattern = `%${trimmedQuery}%`;

            // Search by base user fields only
            const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                userId, createdDate, updatedDate, username, email, firstName, lastName,
                UserProfile(profileId, roleName),
                Status(statusId, statusName)
            `)
            .or(`username.ilike.${pattern},email.ilike.${pattern},firstName.ilike.${pattern},lastName.ilike.${pattern}`);

            if (error) {
            console.error("searchUser(): Database error:", error.message);
            return [];
            }

            console.log(`searchUser(): Found ${data.length} users for query "${query}"`);
            return data;
        } catch (err) {
            console.error("searchUser(): Unexpected error:", err);
            return [];
        }
    }

    async getUserInfo(userId){
        const { data, error } = await supabase.
            from(this.tableName)
            .select('*')
            .eq('userId', userId)
            .maybeSingle();

        console.log("GetUserInfo(): response from database: ", data);
        
        if (error){
            console.error("GetUserInfo(): An error has occurred. Error: ", error);
        }

        return data;
    }

    async createUser(user){

        const existingUser = await supabase
            .from(this.tableName)
            .select('userId')
            .eq('username', user.username)
            .maybeSingle();

        if (existingUser.data) {
            return {
                success: false,
                message: "Existing User"
            }
        }

        const currentId = await this.getAllUserInfo();
        const userId = currentId.length + 1;

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                userId: userId,
                username : user.username,
                password: user.password,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userProfileId: user.userProfileId,
                userStatusId: 1,
                updatedDate: Date.now
            }])
            .select('userId, username, email, firstName, lastName, userProfileId, userStatusId, createdDate')
            .maybeSingle();

        console.log("createUser(): response from database: ", data);

        if (error){
            console.error("createUser(): An error has occurred. Error: " + error.message);
        }

        return data;
    }

    async updateUserInfo(userData){
        const { data, error } = await supabase
            .from(this.tableName)
            .update({
                username : userData.username,
                password : userData.password,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                userProfileId: userData.userProfileId,
                updatedDate: Date.now
            })
            .eq('userId', userData.userId)
            .select('userId, username, email, firstName, lastName, userProfileId, userStatusId, createdDate')
            .maybeSingle();

        console.log("updateUserInfo(): response from database: ", data);

        if (error){
            console.error("updateUserInfo(): An error has occurred. Error: ", error);
        }

        return data;
    }

    async changeUserStatus(userId, userStatus){
        const { data, error} = await supabase
            .from(this.tableName)
            .update({
                userStatusId : userStatus
            })
            .eq('userId', userId)
            .select();
        
        console.log("ChangeUserStatus(): Response from database: ", data);
        
        if (error){
            console.error("ChangeUserStatus(): An error has occurred. Error: " + error.message);
        }
        
        return data;
    }

}



module.exports = User;