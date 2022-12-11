import React, { Component } from "react";
import AuthService from "../../services/auth/auth.service";
import OrganizationService from "../../services/organization/organization.service";
import EmployeeService from "../../services/employee/employee.service";
import SpecialityService from "../../services/organization/speciality.service";


export default class OrganizationModeration extends Component {
  constructor(props) {
    super(props);

    this.loadInfo = this.loadInfo.bind(this);
    this.onChangeNewSpeciality = this.onChangeNewSpeciality.bind(this);
    this.editEmployeeInfo = this.editEmployeeInfo.bind(this);
    this.onChangeNewOrgName = this.onChangeNewOrgName.bind(this);
    this.onChangeNewOrgFunds = this.onChangeNewOrgFunds.bind(this);
    this.editOrgInfo = this.editOrgInfo.bind(this);
    this.deleteOrganization = this.deleteOrganization.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.acceptEmployee = this.acceptEmployee.bind(this);
    this.rejectEmployee = this.rejectEmployee.bind(this);

    this.state = {
      organizationName: "",
      organizationFunds: 0,
      newOrgName: "",
      newOrgFunds: undefined,
      role: "",
      speciality: "",
      newSpecialityId: 0,
      availabelSpecialities: [],
      employees: [],
      applicationsForMemberShip: []
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
    EmployeeService.getAllEmployeesInOrganization(orgId)
    .then(response => {
      this.setState({
        employees: response.employees
      });
    });
    OrganizationService.getApplicationsForMemberShip(orgId)
    .then(response => {
      this.setState({
        applicationsForMemberShip: response.applicationForMembership
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

  onChangeNewOrgName(e){
    this.setState({
      newOrgName: e.target.value
    });
  }

  onChangeNewOrgFunds(e){
    this.setState({
      newOrgFunds: e.target.value
    });
  }

  editOrgInfo(){
    var data = {
      newName: this.state.newOrgName ? this.state.newOrgName : this.state.organizationName,
      newFunds: this.state.newOrgFunds ? this.state.newOrgFunds : this.state.organizationFunds
    };
    const orgId = AuthService.getCurrentUser().organizationId;
    OrganizationService.eidtOrgInfo(orgId, data)
    .then(()=>{
      window.location.reload(false);
    });
  }

  deleteOrganization(){
    const orgId = AuthService.getCurrentUser().organizationId;
    OrganizationService.deleteOrganization(orgId)
    .then(()=>{
      AuthService.updateUserInfo()
      .then(()=>{
        window.location = "/home";
      });
    });
  }

  deleteEmployee(emplId){
    const orgId = AuthService.getCurrentUser().organizationId;
    OrganizationService.leaveOrganization(orgId, emplId)
    .then(()=>{
      window.location.reload(false);
    });
  }

  acceptEmployee(userId){
    const organizationId = AuthService.getCurrentUser().organizationId;
    OrganizationService.acceptUser(organizationId, userId)
    .then(()=>{
      window.location.reload(false);
    });
  }

  rejectEmployee(userId){
    const orgId = AuthService.getCurrentUser().organizationId;
    OrganizationService.rejectUser(orgId, userId)
    .then(()=>{
      window.location.reload(false);
    });
  }


  render() {

    const { organizationName, 
      organizationFunds, 
      role, 
      speciality,
      availabelSpecialities,
      employees,
      applicationsForMemberShip 
    } = this.state;


    return (
      <>

      
<div className="container-create">
    <h1 className="head">Organization info</h1>
    <div className="form-create">
      <label for="nameOrganization">Name: {organizationName}</label>
      <input type="text" className="form-control" id="curNameOrganization"  placeholder="new name"
      required value={this.state.newOrgName} onChange={this.onChangeNewOrgName}/>
    </div>
    <div className="form-create">
      <label for="availableFunds">Available funds: {organizationFunds}</label>
      <input type="number" className="form-control" id="availableFunds" placeholder="new funds"
      required value={this.state.newOrgFunds} onChange={this.onChangeNewOrgFunds}/>
    </div>
    <br/>

    <button type="submit" className="btn btn-primary btn-lg" onClick={this.editOrgInfo}>Save</button>
    <br/>
    <br/>
    <button type="submit" className="btn btn-primary btn-lg btn-danger" onClick={this.deleteOrganization}>Delete organization</button>
    <br/>
    <br/>
  </div>

  <div className="container-table-director">
    <table className="table table table-sm table-bordered">
        <thead>
          <tr>
            <th>Employees</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {employees && employees.map((empl)=>(
          
            <tr>
            <td>
              <div>
                {empl.id}, {empl.role}, {empl.speciality.name}
              </div>
            </td>
            <td>
              <button type="button" className="btn btn-primary" onClick={()=>this.deleteEmployee(empl.id)}>Delete</button>
            </td>
          </tr>
            
          ))}

        </tbody>
    </table>
    <table className="table table table-sm table-bordered">
        <thead>
          <tr>
            <th>Requests to join</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applicationsForMemberShip && applicationsForMemberShip.map((user) => (
            <tr>
              <td>
                name: {user.name}, surname: {user.surname}, age: {user.age}, efficiency: {user.statistics.efficiency}
              </td>
              <td>
                <button type="button" className="btn btn-primary" onClick={() => this.acceptEmployee(user.id)}>Accept</button> 
                <button type="button" className="btn btn-primary" onClick={() => this.rejectEmployee(user.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    <br/>
    <br/>
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