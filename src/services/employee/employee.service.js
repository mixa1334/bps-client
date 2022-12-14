import axios from "axios";
import authHeader from "../auth/auth-header";
import API_URL from "../api";

class EmployeeService {
    async getEmployeeInfo(orgId, empId){
        const response = await axios.get(API_URL + "/organizations/" + orgId + "/employees/" + empId, {
            headers: authHeader()
        });
        return response.data;
    }

    async editEmployeeInfo(orgId, empId, data){
        const response = await axios.put(API_URL + "/organizations/" + orgId + "/employees/" + empId, data, {
            headers: authHeader()
        });
        return response.data;
    }

    async getAllEmployeesInOrganization(orgId){
        const response = await axios.get(API_URL + "/organizations/" + orgId + "/employees", {
            headers: authHeader()
        });
        return response.data;
    }
}

export default new EmployeeService();