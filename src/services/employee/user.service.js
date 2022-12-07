import api from "../api";
import authHeader from "../auth/auth-header";

import AuthService from "../auth/auth.service";

class UserService {
    async getInfo(userId){
        const response = await api
        .get('/users/' + userId);
        return response.data;
    }

    async updateInfo(userId, data){
        const response = await api
        .put('/users/' + userId, data);
        return response.data;
    }

    async changeLogin(userId, newLogin){
        const response = await api
        .put('/users/' + userId + '/login', {
            newLogin
        });
        return response.data;
    }

    async changePassword(userId, newPassword){
        const response = await api
        .put('/users/' + userId + '/password', {
            newPassword
        });
        return response.data;
    }
}

export default new UserService();
