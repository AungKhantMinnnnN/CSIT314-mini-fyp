import { authAPI } from "../api/auth.api";

class AuthController {
    async login(username, password) {
        try {
            const response = await authAPI.login({username, password});

            console.log(response);

            if (response.data.success){
                console.log("Response is success.");
                console.log(response.data.data);
                localStorage.setItem('user', JSON.stringify(response.data.data.user.username));
                console.log(localStorage.getItem('user'));
                return response.data;
            }

            throw new Error(response.message || 'Login Failed');
        }
        catch (error){
            console.log(error);
            throw new Error(error.message || 'Login Failed');
        }
    }

    async logout(username){
        try{
            console.log("Logout function: " + username);

            const response = await authAPI.logout({username});

            console.log(response)

            if(response.data.success){
                console.log("Response is a success.");
                console.log(response.data);
                localStorage.removeItem('user');
                window.location.href = '/';
            }

            throw new Error(response.message || "LogOut failed.")
        }
        catch (error){
            console.log(error);
            throw new Error(error.message || "LogOut failed.")
        }
    }
}

export default new AuthController();