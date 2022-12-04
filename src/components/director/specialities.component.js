import React, { Component } from "react";

import AuthService from "../../services/auth/auth.service";
import SpecialityService from "../../services/organization/speciality.service";

export default class Specialities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      specialities: []
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if(user){
      SpecialityService.getAllByOrgId(user.organizationId)
      .then(response => {
        this.setState({
          specialities: response.data.specialities
        });
      })
      .catch(e => {
        console.log(e);
      });
    }
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
                    <button type="button" className="btn btn-primary">Delete</button>
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
          <input type="text" className="form-control" id="nameSpeciality"  placeholder="enter name"/>
        </div>
        <div className="form-create">
          <label for="descriptionSpeciality">Disription</label>
          <input type="text" className="form-control" id="descriptionSpeciality" placeholder="enter disription"/>
        </div>
        <br/>
        <button type="submit" className="btn btn-primary btn-lg">Add</button>
      </div>
      
      </>
    );
  }
}