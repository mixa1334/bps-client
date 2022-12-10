import React, { Component } from "react";
import AuthService from "../../services/auth/auth.service";
import OrganizationService from "../../services/organization/organization.service";
import EmployeeService from "../../services/employee/employee.service";
import SpecialityService from "../../services/organization/speciality.service";

export default class OrganizationInfo extends Component {
  constructor(props) {
    super(props);

    this.loadInfo = this.loadInfo.bind(this);
    this.onChangeNewSpeciality = this.onChangeNewSpeciality.bind(this);
    this.editEmployeeInfo = this.editEmployeeInfo.bind(this);
    this.leaveOrganization = this.leaveOrganization.bind(this);

    this.state = {
      organizationName: "",
      organizationFunds: 0,
      role: "",
      speciality: "",
      newSpecialityId: 0,
      availabelSpecialities: []
    };
  }

  componentDidMount() {
    this.loadInfo();
  }

  loadInfo(){
    const user = AuthService.getCurrentUser();
    const orgId = user.organizationId;
    const profileId = user.profileId;
    OrganizationService.getOranizationInfo(orgId)
    .then(response => {
      this.setState({
        organizationName: response.organizationName,
        organizationFunds: response.availableFunds
      });
    });
    EmployeeService.getEmployeeInfo(orgId, profileId)
    .then(response => {
      this.setState({
        role: response.role,
        speciality: response.speciality
      });
    });
    SpecialityService.getAllByOrgId(orgId)
    .then(response => {
      this.setState({
        availabelSpecialities: response.specialities,
        newSpecialityId: response.specialities[0].id
      });
    });
  }

  onChangeNewSpeciality(e){
    this.setState({
      newSpecialityId: e.target.value
    });
  }

  editEmployeeInfo(){
    var data = {
      specialityId: this.state.newSpecialityId,
      role: this.state.role
    }

    const user = AuthService.getCurrentUser();
    EmployeeService.editEmployeeInfo(user.organizationId, user.profileId, data)
    .then(()=>{
      window.location.reload(false);
    });
  }

  leaveOrganization(){
    const user = AuthService.getCurrentUser();
    OrganizationService.leaveOrganization(user.organizationId, user.profileId)
    .then(()=>{
      AuthService.updateUserInfo()
      .then(()=>{
        window.location = "/home";
      });
    });
  }

  render() {
    const { organizationName, organizationFunds, role, speciality, availabelSpecialities } = this.state;

    return (
    <>

    <div className="container-organization-analyst-info">
      <h1 className="head">Organization info</h1>
      <p>Name: {organizationName}</p>
      <p>Available funds: {organizationFunds}</p>
      <button type="submit" className="btn btn-primary btn-lg btn-danger" 
      onClick={this.leaveOrganization}
      >Leave organization</button>
      <br />
      <br />
    </div>


    <div className="container-organization-analyst-info">
      <h1 className="head">Employee profile</h1>
      <p style={{marginBottom: '0px', paddingLeft: '4px',}}>Role: {role}</p>
      <p>Speciality: {speciality.name}</p>

      <div className="row">
          <div className="col-sm-3 p-3" style={{lineHeight: '20px',}}>
            <label for="speciality-select">New speciality</label>
            <select className="form-select form-select-sm"
              id="speciality-select"
              onChange={this.onChangeNewSpeciality}
            >
              {availabelSpecialities && availabelSpecialities.map((spec)=>(
                <option value={spec.id}>{spec.name}</option>
              ))}
            </select>
          </div>
          <div className="col-sm-1 p-4"><button type="button" className="btn btn-primary" style={{lineHeight: '31px',}} 
          onClick={this.editEmployeeInfo}>Update</button></div>
      </div>
    </div>
    </>   
    );
  }
}