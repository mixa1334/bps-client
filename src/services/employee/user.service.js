import http from "../../http-common";
import authHeader from "../auth/auth-header";

import AuthService from "../auth/auth.service";

class UserService {
    getUserInfo(userId){
        return http.get('/users/'+userId);
    }

    updateUserInfo(userId, data){
        return http.put('/users/'+userId, data);
    }

    changeUserLogin(userId, newLogin){
        return http.put('/users/' + userId + '/login', {
            newLogin
        });
    }

    changePassword(userId, newPassword){
        return http.put('/users/'+userId+'/password', {
            newPassword
        });
    }
}

export default new UserService();
