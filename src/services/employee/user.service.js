import axios from "axios";
import authHeader from "../auth/auth-header";
import AuthService from "../auth/auth.service";

const API_URL = "http://localhost:8080/bps";

class UserService {
    async getInfo(userId){
        const response = await axios
        .get(API_URL + '/users/' + userId, { 
            headers: authHeader() 
        });
        return response.data;
    }

    async updateInfo(userId, data){
        const response = await axios
        .put(API_URL + '/users/' + userId, data, { 
            headers: authHeader() 
        });
        return response.data;
    }

    async changeLogin(userId, newLogin){
        const response = await axios
        .put(API_URL + '/users/' + userId + '/login', {
            newLogin
        }, { 
            headers: authHeader() 
        });
        return response.data;
    }

    async changePassword(userId, newPassword){
        const response = await axios
        .put(API_URL + '/users/' + userId + '/password', {
            newPassword
        }, { 
            headers: authHeader() 
        });
        return response.data;
    }
}

export default new UserService();
