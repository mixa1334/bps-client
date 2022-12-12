import axios from "axios";
import API_URL from "../api";

class AuthService {
  async login(login, password) {
    const response = await axios
    .post(API_URL + "/auth/login", {
      login,
      password
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(data) {
    const response = await axios
    .post(API_URL + "/auth/signup", data);
    return response;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  updateToken(newToken){
    let user = JSON.parse(localStorage.getItem("user"));
    user.token = newToken;
    localStorage.setItem("user", JSON.stringify(user));
  }

  async updateUserInfo(){
    const accessToken = JSON.parse(localStorage.getItem("user")).token;
    const response = await axios({ method: 'post', url: API_URL + "/auth/user_details"
      , headers: { 'Authorization': accessToken } });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
}

export default new AuthService();
