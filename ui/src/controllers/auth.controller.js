import { authAPI } from "../api/auth.api";

class AuthController {
    async login(username, password) {
        try {
            const response = await authAPI.login({username, password});

            if (response.success){
                console.log("Response is success.");
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data.username));
                return response.data;
            }

            throw new Error(response.message || 'Login Failed');
        }
        catch (error){
            throw new Error(error.message || 'Login Failed');
        }
    }

    async logout(){
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
}

export default new AuthController();