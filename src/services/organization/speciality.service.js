import api from "../api";
import authHeader from "../auth/auth-header";

class SpecialityService {
    async getAllByOrgId(orgId){
        const response = await api
        .get('/organizations/' + orgId + '/specialities');
        return response.data;
    }

    async deleteById(orgId, specialityId){
        const response = await api
        .delete('/organizations/' + orgId + '/specialities/' + specialityId);
        return response.data;
    }

    async create(orgId, data){
        const response = await api
        .post('/organizations/' + orgId + '/specialities', data);
        return response.data;
    }
}

export default new SpecialityService();