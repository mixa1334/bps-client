import axios from "axios";
import authHeader from "../auth/auth-header";
import authService from "../auth/auth.service";

const API_URL = "http://localhost:8080/bps";

class TaskService {
    async getAllEmployeeTasks(orgId, emplId){
        const response = await axios.get(API_URL + "/organizations/" + orgId + "/employees/" + emplId + "/tasks", { 
            headers: authHeader() 
        });
        return response.data;
    }

    async completeTask(orgId, planId, taskId){
        const accessToken = authService.getCurrentUser().token;
        const response = await axios({ method: 'put', url: API_URL + "/organizations/" + orgId + "/business_plans/" + planId + "/tasks/" + taskId
        , headers: { 'Authorization': accessToken } });
        return response.data;
    }

    async createNewTask(orgId, planId, data){
        const resonse = await axios.post(API_URL + "/organizations/" + orgId + "/business_plans/" + planId + "/tasks", data, {
            headers: authHeader()
        });
        return resonse.data;
    }
}

export default new TaskService();