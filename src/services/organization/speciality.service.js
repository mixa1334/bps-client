import http from "../../http-common";
import authHeader from "../auth/auth-header";

class SpecialityService {
    getAllByOrgId(orgId){
        return http.get('/organizations/'+orgId+'/specialities');
    }
}

export default new SpecialityService();