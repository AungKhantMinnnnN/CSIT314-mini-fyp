import { authAPI } from "../api/auth.api";

class AuthController {
    async login(username, password) {
        try {
            console.log("Login from auth controller called.");
            const response = await authAPI.login({username, password});

            console.log(response);

            if (response.data.success){
                if(response.data.data.user.username != ""){
                    console.log("Response is success.");
                    console.log(response.data.data);
                    localStorage.setItem('user', JSON.stringify(response.data.data.user.username, response.data.data.user.userProfileId));
                    console.log(localStorage.getItem('user'));
                    return response.data;
                }
            }

            console.error(response.message);
            console.error('Login failed.');
            throw new Error(response.message || 'Login Failed');
        }
        catch (error){
            console.log(error);
            throw new Error(error.message || 'Login Failed');
        }
    }

    async logout(){
        try{
            console.log("Logout function called.");
            localStorage.removeItem('user');
            window.location.href = '/';
        }
        catch (error){
            console.error(error);
            throw new Error(error.message || "LogOut failed.")
        }
    }
}

export default new AuthController();