import React, { Component } from "react";

export default class OrganizationInfo extends Component {
  // constructor(props) {
  //   super(props);

  // }

  // componentDidMount() {
  // }

  render() {
    return (
    <>

    <div className="container-organization-analyst-info">
      <h1 className="head">Organization info</h1>
      <p>Name: current name</p>
      <p>Available funds: current funds</p>
      <button type="submit" className="btn btn-primary btn-lg btn-danger">Leave organization</button>
      <br />
      <br />
    </div>


    <div className="container-organization-analyst-info">
      <h1 className="head">Employee profile</h1>
      <p style={{marginBottom: '0px', paddingLeft: '4px',}}>Role: role</p>
      
      <div className="row">
          <div className="col-sm-3 p-3" style={{lineHeight: '20px',}}><label for="speciality1">Speciality:</label>
              <select className="form-select form-select-sm">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
              </select>
          </div>
          <div className="col-sm-1 p-4"><button type="button" className="btn btn-primary" style={{lineHeight: '31px',}}>Save</button></div>
      </div>
    </div>


    </>   
    );
  }
}