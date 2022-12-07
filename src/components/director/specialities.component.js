import React, { Component } from "react";

import AuthService from "../../services/auth/auth.service";
import SpecialityService from "../../services/organization/speciality.service";

export default class Specialities extends Component {
  constructor(props) {
    super(props);

    this.getAllSpecialities = this.getAllSpecialities.bind(this);
    this.deleteSpecialityById = this.deleteSpecialityById.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.createNewSpeciality = this.createNewSpeciality.bind(this);

    this.state = {
      specialities: [],
      newName: "",
      newDescription: ""
    };
  }

  componentDidMount() {
    this.getAllSpecialities();
  }

  getAllSpecialities(){
    const organizationId = AuthService.getCurrentUser().organizationId;
    SpecialityService.getAllByOrgId(organizationId)
    .then(response => {
      this.setState({
        specialities: response.specialities
      });
    });
  }

  deleteSpecialityById(specialityId){
    const organizationId = AuthService.getCurrentUser().organizationId;
    SpecialityService.deleteById(organizationId, specialityId)
    .then(()=>{
      window.location.reload(false);
    });
  }

  onChangeName(e){
    this.setState({
      newName: e.target.value
    });
  }

  onChangeDescription(e){
    this.setState({
      newDescription: e.target.value
    });
  }

  createNewSpeciality(){
    var data = {
      name: this.state.newName,
      description: this.state.newDescription
    };
    const organizationId = AuthService.getCurrentUser().organizationId;
    SpecialityService.create(organizationId, data)
    .then(()=>{
      window.location.reload(false);
    });
  }

  render() {
    const { specialities } = this.state;

    return (
      <>
      
      <div className="container-table">
        <h1 className="head">Specialities in organization</h1>
        <table className="table table table-sm">
            <thead>
              <tr>
                <th>Speciality name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {specialities && specialities.map((speciality) => (
                <tr>
                  <td>Name: {speciality.name} <br/> Disription: {speciality.description}</td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={() => this.deleteSpecialityById(speciality.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

      <div className="container-create">
        <h1 className="head">Add new speciality</h1>
        <div className="form-create">
          <label for="nameSpesiality">Name</label>
          <input type="text" className="form-control" id="nameSpeciality"  placeholder="enter name"
           required value={this.state.newName} onChange={this.onChangeName}/>
        </div>
        <div className="form-create">
          <label for="descriptionSpeciality">Disription</label>
          <input type="text" className="form-control" id="descriptionSpeciality" placeholder="enter disription"
          required value={this.state.newDescription} onChange={this.onChangeDescription}/>
        </div>
        <br/>
        <button type="submit" className="btn btn-primary btn-lg" onClick={this.createNewSpeciality}>Add</button>
      </div>
      
      </>
    );
  }
}