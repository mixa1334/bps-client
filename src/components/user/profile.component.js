import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
      <>
      
      <div className="container">
        <h1 className="head">Profile</h1>
        <div className="form-create">
          <label for="nameProfile">Name:</label>
          <input type="text" className="form-control" id="nameProfile"  placeholder="Alex"/>
        </div>
        <div className="form-create">
          <label for="surnameProfile">Surname:</label>
          <input type="text" className="form-control" id="surnameProfile" placeholder="Alex"/>
        </div>
        <div className="form-create">
          <label for="ageProfile">Age:</label>
          <input type="text" className="form-control" id="ageProfile" placeholder="29"/>
        </div>
        <div className="form-create">
          <label for="phoneProfile">Phone number:</label>
          <input type="text" className="form-control" id="phoneProfile" placeholder="+375 (29) 111-11-11"/>
        </div>
          
        <br/>
  
        <button type="submit" className="btn btn-primary btn-lg">Save</button>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>

      <div className="container-table">
        <h1 className="head">Update login&password</h1>
        <br/>
        <div className="row">
            <div className="col"> 
              <input type="password" className="form-control" id="newLogin"  placeholder="Input new login"/>
            </div>  
            <div className="col">
              <button type="button" className="btn btn-primary">Update</button>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col"> 
              <input type="password" className="form-control" id="newPassword"  placeholder="Input new password"/>
            </div>  
            <div className="col">
              <button type="button" className="btn btn-primary">Update</button>
            </div>
        </div>
        <br/>
      </div>

      <div className="container">
        <h3><b>Statistics:</b></h3>
        <h5>Compeled tasks: 1</h5>
        <h5>Compeled after deadline: 0</h5>
        <h5>Compeled on time: 1</h5>
        <h5>Effeciency: 100%</h5>
      </div>
      
      </>
    );
  }
}
