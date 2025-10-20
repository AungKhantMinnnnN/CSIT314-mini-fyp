const supabase = require('../config/supabase_client');

class User{
    constructor(){
        this.tableName = 'User';
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
        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                username : userData.username,
                password: userData.password,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: phoneNumber,
                userProfileId: userData.roleId,
                userStatusId: 1,
                updatedDate: Date.Now()
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
}

module.exports = new User();