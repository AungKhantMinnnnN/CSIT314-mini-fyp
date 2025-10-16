const supabase = require('../config/supabase_client');

class User{
    constructor(){
        this.tableName = 'User';
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
                roleId: userData.roleId,
                statusId: userData.statusId,
                updatedDate: Date.Now()
            }])
            .select('userId, username, email, role, status, createdDate')
            .maybeSingle();

        if (error){
            console.error("createUser(): An error has occurred. Error: " + error.message);
        }

        return data;
    }
}

module.exports = new User();