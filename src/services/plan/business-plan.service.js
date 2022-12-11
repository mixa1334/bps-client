import axios from "axios";
import authHeader from "../auth/auth-header";
import API_URL from "../api";

class BusinessPlanService {
    async getAllBusinessPlans(orgId){
        const response = await axios.get(API_URL + "/organizations/" + orgId + "/business_plans", {
            headers: authHeader()
        });
        return response.data;
    }

    async createNewPlan(orgId, data){
        const response = await axios.post(API_URL + "/organizations/" + orgId + "/business_plans", data, {
            headers: authHeader()
        });
        return response.data;
    }

}

export default new BusinessPlanService();