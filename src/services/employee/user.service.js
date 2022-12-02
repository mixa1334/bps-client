import http from "../../http-common";
import authHeader from "../auth/auth-header";

class UserService {
  getPublicContent() {
    return http.get("/all");
  }

  getUserBoard() {
    return http.get("/employee", { headers: authHeader() });
  }

  getModeratorBoard() {
    return http.get("/analyst", { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get("/director", { headers: authHeader() });
  }
}

export default new UserService();
