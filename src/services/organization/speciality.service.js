import axios from "axios";
import authHeader from "../auth/auth-header";
import API_URL from "../api";

class SpecialityService {
    async getAllByOrgId(orgId){
        const response = await axios
        .get(API_URL + '/organizations/' + orgId + '/specialities', { 
            headers: authHeader() 
        });
        return response.data;
    }

    async deleteById(orgId, specialityId){
        const response = await axios
        .delete(API_URL + '/organizations/' + orgId + '/specialities/' + specialityId, { 
            headers: authHeader() 
        });
        return response.data;
    }

    async create(orgId, data){
        const response = await axios
        .post(API_URL + '/organizations/' + orgId + '/specialities', data, { 
            headers: authHeader() 
        });
        return response.data;
    }
}

export default new SpecialityService();