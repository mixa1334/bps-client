import api from "../api";

class AuthService {
  async login(login, password) {
    const response = await api
    .post("/auth/login", {
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

  async register(username, email, password) {
    const response = await api
    .post("/auth/signup", {
      username,
      email,
      password
    });
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
    const response = await api
    .post("/auth/user_info", {
      userId
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
}

export default new AuthService();
