const supabase = require('../config/supabase_client');
const getRandomId = require('../utils/randomId');

class User{
    constructor(){
        this.tableName = 'User';
    }

    async getAllUserInfo(){
        const { data, error } = await supabase
            .from(this.tableName)
            .select(`
                *,
                Status(stausId, statusName),
                UserProfile(profileId, roleName)
            `);
        
        console.log("GetAllUserInfo(): Response from database: ", data.length);

        if (error){
            console.error("GetAllUserInfo(): An error has occurred. Error: ", error)
        }

        return data;
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

    async createUser(userData){

        const userId = getRandomId(1000, 9999);

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                userId: userId,
                username : userData.username,
                password: userData.password,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                userProfileId: userData.userProfileId,
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
        const profileId = getRandomId(1000, 9999);

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