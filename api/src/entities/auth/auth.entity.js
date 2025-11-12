const supabase = require('../../config/supabase_client');

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
            .maybeSingle();

        if (error) {
            console.error("Auth.Entity.Login(): An error has occurred. Error: " + error.message);
        }

        return data;
    }

}

module.exports = Auth;