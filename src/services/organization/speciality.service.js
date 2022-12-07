import http from "../../http-common";
import authHeader from "../auth/auth-header";

class SpecialityService {
    getAllByOrgId(orgId){
        return http.get('/organizations/'+orgId+'/specialities');
    }

    deleteById(orgId, specialityId){
        return http.delete('/organizations/'+orgId+'/specialities/'+specialityId);
    }

    create(orgId, data){
        return http.post('/organizations/'+orgId+'/specialities', data);
    }
}

export default new SpecialityService();