import axios from "axios";
import authHeader from "../auth/auth-header";
import authService from "../auth/auth.service";

const API_URL = "http://localhost:8080/bps";

class OrganizationService {
    async eidtOrgInfo(orgId, data){
        const response = await axios.put(API_URL + "/organizations/" + orgId, data, {
            headers: authHeader()
        });
        return response.data;
    }

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

    async deleteOrganization(orgId){
        const response = await axios.delete(API_URL + "/organizations/" + orgId, {
            headers: authHeader()
        });
        return response.data;
    }

    async getApplicationsForMemberShip(orgId){
        const response = await axios.get(API_URL + "/organizations/" + orgId + "/applications", {
            headers: authHeader()
        });
        return response.data;
    }

    async acceptUser(orgId, userId){
        const accessToken = authService.getCurrentUser().token;
        const response = await axios({ method: 'post', url: API_URL + "/organizations/" + orgId + "/applications/" + userId + "/accept"
        , headers: { 'Authorization': accessToken } });
        return response.data;
    }

    async rejectUser(orgId, userId){
        const accessToken = authService.getCurrentUser().token;
        const response = await axios({ method: 'post', url: API_URL + "/organizations/" + orgId + "/applications/" + userId + "/reject_user"
        , headers: { 'Authorization': accessToken } });
        return response.data;
    }

}

export default new OrganizationService();