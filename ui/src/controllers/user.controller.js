import { userAPI } from "../api/user.api";

class UserController {
    async getAllUserInfo(){
        try{
            const response = await userAPI.getAll();
            if (response.data.success){
                return response.data;
            }
            else{
                console.log(response);
            }
        }
        catch (error){
            console.error(error);
            throw new Error(error.message || 'Get all users failed.');
        }
    }
}

export default new UserController();