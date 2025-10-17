const supabase = require('../config/supabase_client');

class Auth{
    constructor(){
        this.tableName = 'User'
    }

    async login(username, password){
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('username', username)
            .eq('password', password)
            //.eq('roleId', roleId)
            .maybeSingle();

        if (error) {
            console.error("Auth.Entity.Login(): An error has occurred. Error: " + error.message);
        }

        return data;
    }

    async logout(){
        const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('roleId', 1)
    }
}

module.exports = new Auth();