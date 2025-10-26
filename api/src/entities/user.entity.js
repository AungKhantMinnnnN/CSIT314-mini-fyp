const supabase = require('../config/supabase_client');

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

        const currentUsers = await this.getAllUserInfo();
        const userId = currentUsers.length + 1;

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                userId: userId,
                username : userData.username,
                password: userData.password,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                userProfileId: userData.roleId,
                userStatusId: 1,
                updatedDate: Date.Now
            }])
            .select('userId, username, email, userProfileId, userStatusId, createdDate')
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
                userStatusId: userData.userStatusId
            })
            .eq('userId', userData.userId)
            .select();

        console.log("updateUserInfo(): response from database: ", data);

        if (error){
            console.error("updateUserInfo(): An error has occurred. Error: " + error.message);
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