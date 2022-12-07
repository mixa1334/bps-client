import http from "../../http-common";

class AuthService {
  async login(login, password) {
    const response = await http
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

  register(username, email, password) {
    return http.post("/auth/signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  async updateUserInfo(){
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const response = await http.post("/auth/user_info", {
      userId
      });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
}

export default new AuthService();
