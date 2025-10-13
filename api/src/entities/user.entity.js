const supabase = require('../config/supabase_client');

class UserEntity {
    constructor(){
        this.tableName = 'UserAdmin';
    }

    async create(userData){

        const { data, error } = await supabase
            .from(this.tableName)
            .insert([{
                username : userData.username,
                password : userData.password,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: phoneNumber,
                roleId: userData.roleId,
                statusId: userData.statusId,
                updatedDate: Date.now()
            }])
            .select('userId, username, email, role, status, createdDate')
            .single();

        if(error){
            throw new Error(error.message);
        }

        return data;
    }

    // login
    async findUserWithUsernameAndPassword(username, password){

        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}

module.exports = new UserEntity();