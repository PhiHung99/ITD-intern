// Dich vu du lieu
import axios from "axios";
import autherHeader from "./auth-header";


const API_URL = 'http://localhost:8080/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: autherHeader() });
    }
    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: autherHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: autherHeader() });
    }
}

export default new UserService();