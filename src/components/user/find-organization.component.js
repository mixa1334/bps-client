import React, { Component } from "react";
import AuthService from "../../services/auth/auth.service";
import OrgService from "../../services/organization/organization.service";

export default class FindOrganization extends Component {
  constructor(props) {
    super(props);
    this.getAllAvailableOrganizations = this.getAllAvailableOrganizations.bind(this);
    this.sendRequestToJoinOrg = this.sendRequestToJoinOrg.bind(this);
    this.onChangeNewOrgName = this.onChangeNewOrgName.bind(this);
    this.onChangeNewOrgFunds = this.onChangeNewOrgFunds.bind(this);
    this.createNewOrg = this.createNewOrg.bind(this);

    this.state = {
      organizations: [],
      newOrgName: "",
      newOrgFunds: 0
    };
  }

  componentDidMount() {
    this.getAllAvailableOrganizations();
  }

  getAllAvailableOrganizations(){
    OrgService.getAllOrganizations()
    .then(response => {
      this.setState({
        organizations: response.organizations
      });
    });
  }

  sendRequestToJoinOrg(orgId){
    const userId = AuthService.getCurrentUser().userId;
    OrgService.sendRequestToJoin(orgId, userId)
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

  createNewOrg(){
    const userId = AuthService.getCurrentUser().userId;
    var data = {
      userId: userId,
      name: this.state.newOrgName,
      funds: this.state.newOrgFunds
    }
    OrgService.createNewOrganization(data)
    .then(()=>{
      AuthService.updateUserInfo()
      .then(()=>{
        window.location = "/home";
      });
    });
  }

  render() {
    const { organizations } = this.state;

    return (
      <>
      
      <div className="container-create">
      <h1 className="head">Create new organization</h1>
      <div className="form-create">
        <label for="nameOrganization">Name</label>
        <input type="text" className="form-control" id="nameOrganization"  placeholder="enter name"
        required value={this.state.newOrgName} onChange={this.onChangeNewOrgName}/>
      </div>
      <div className="form-create">
        <label for="funds">Funds</label>
        <input type="number" className="form-control" id="funds" placeholder="funds"
        required value={this.state.newOrgFunds} onChange={this.onChangeNewOrgFunds}/>
      </div>
      <br/>
      <button type="submit" className="btn btn-primary btn-lg" onClick={() => this.createNewOrg()}>Create</button>
    </div>

    <div className="container-table mt-3">
      <h1 className="head">Available organization</h1>
      <table className="table table-borderless table-sm">
        <thead>
          <tr>
            <th>Organization name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {organizations && organizations.map((org) => (
            <tr>
              <td>{org.name}</td>
              <td><button type="button" className="btn btn-primary" onClick={() => this.sendRequestToJoinOrg(org.id)}>Send request</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
      </>
    );
  }
}