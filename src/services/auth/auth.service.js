import axios from "axios";
import authHeader from "./auth-header";
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
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const response = await axios
    .post(API_URL + "/auth/user_details", {
      userId
    }, { 
      headers: authHeader()
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
}

export default new AuthService();
