import axios from "axios";
import authHeader from "../auth/auth-header";

const API_URL = "http://localhost:8080/bps";

class OrganizationService {

    async getOranizationInfo(orgId){
        const response = await axios.get(API_URL + "/organizations/" + orgId, {
            headers: authHeader()
        });
        return response.data;
    }

    async leaveOrganization(orgId, empId){
        const response = await axios.delete(API_URL + "/organizations/"+ orgId + "/employees/"+ empId, {
            headers: authHeader()
        });
        return response.data;
    }

    async getAllOrganizations(){
        const response = await axios.get(API_URL + "/organizations", {
            headers: authHeader()
        });
        return response.data;
    }

    async sendRequestToJoin(orgId, userId){
        const response = await axios.post(API_URL + "/organizations/"+ orgId + "/applications", {
            userId
        }, {
            headers: authHeader()
        });
        return response.data;
    }

    async createNewOrganization(data){
        const response = await axios.post(API_URL + "/organizations", data, {
            headers: authHeader()
        });
        return response.data;
    }

}

export default new OrganizationService();