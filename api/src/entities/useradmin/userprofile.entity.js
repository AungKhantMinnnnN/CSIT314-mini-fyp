const supabase = require('../../config/supabase_client');

class UserProfile{
    constructor(){
        this.tableName = 'UserProfile';
    }
    async getAllUserProfile(){
        const { data, error } = await supabase
            .from(this.tableName)
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
                .from(this.tableName)
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
            .from(this.tableName)
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
            .from(this.tableName)
            .insert([{
                profileId: profileId,
                updatedDate: Date.now,
                roleName: profile.roleName,
                description: profile.description,
                userProfileStatusId: 1,
                permissions: profile.permissions
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
        console.log(profile);
        const { data, error } = await supabase
            .from(this.tableName)
            .update({
                updatedDate: Date.now,
                roleName: profile.roleName,
                description: profile.description,
                userProfileStatusId: profile.userProfileStatusId,
                permissions: profile.permission
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
            .from(this.tableName)
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

module.exports = UserProfile;