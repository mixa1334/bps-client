import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/bps/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'employee', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'analyst', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'director', { headers: authHeader() });
  }
}

export default new UserService();
