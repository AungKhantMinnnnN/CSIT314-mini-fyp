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

    async getAllUserProfile(){
        const { data, error } = await supabase
            .from("UserProfile")
            .select(`
                *
            `);
        
        console.log("getAllUserProfile(): Response from database: ", data)

        if (error){
            console.error("getAllUserProfile(): An error has occurred. Error: " + error.message);
        }
        return data
    }

    async searchUserProfile(query) {
        try {
            const trimmedQuery = query?.trim();
            if (!trimmedQuery) return [];

            const pattern = `%${trimmedQuery}%`;
            const isNumber = !isNaN(Number(trimmedQuery));

            const orConditions = [
                `roleName.ilike.${pattern}`,
                `description.ilike.${pattern}`
            ];

            if (isNumber) {
                orConditions.push(`profileId.eq.${trimmedQuery}`);
            }

            const { data, error } = await supabase
                .from("UserProfile")
                .select("*")
                .or(orConditions.join(","));

            if (error) {
                console.error("searchUserProfile(): Database error:", error.message);
                return [];
            }
            return data;
        } catch (err) {
            console.error("searchUserProfile(): Unexpected error:", err);
            return [];
        }
    }

    async getProfileInfo(profileId){
        const { data, error } = await supabase
            .from("UserProfile")
            .select('*')
            .eq('profileId', profileId)
            .maybeSingle();

        console.log("GetUserProfile(): response from database: ", data);
        
        if (error){
            console.error("GetUserProfileInfo(): An error has occurred. Error: ", error);
        }

        return data;
    }

    async createProfile(profile){
        const currentId = await this.getAllUserProfile();
        const profileId = currentId.length + 1

        const { data, error } = await supabase
            .from("UserProfile")
            .insert([{
                profileId: profileId,
                updatedDate: Date.now,
                roleName: profile.roleName,
                description: profile.description,
                userProfileStatusId: 1
            }])
            .select('*')
            .maybeSingle();

        console.log("createProfile(): response from database: ", data);

        if (error){
            console.error("createProfile(): An error has occurred. Error: " + error.message);
        }

        return data;
    }

    async updateProfile(profile){
        const { data, error } = await supabase
            .from("UserProfile")
            .update({
                updatedDate: Date.now,
                roleName: profile.roleName,
                description: profile.description,
                userProfileStatusId: profile.userProfileStatusId
            })
            .eq('profileId', profile.profileId)
            .select('*')
            .maybeSingle();

        console.log("updateProfile(): response from database: ", data);

        if (error){
            console.error("updateProfile(): An error has occurred. Error: ", error);
        }

        return data;
    }

    async changeProfileStatus(profileId, userProfileStatus){
        const { data, error} = await supabase
            .from("UserProfile")
            .update({
                userProfileStatusId : userProfileStatus
            })
            .eq('profileId', profileId)
            .select();
        
        console.log("ChangeProfileStatus(): Response from database: ", data);
        
        if (error){
            console.error("ChangeProfileStatus(): An error has occurred. Error: " + error.message);
        }
        
        return data;
    }
}

module.exports = User;