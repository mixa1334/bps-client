import React, { Component } from "react";

export default class OrganizationModeration extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }


  render() {
    return (
      <>

      
<div className="container-create">
    <h1 className="head">Organization info</h1>
    <div className="form-create">
      <label for="nameOrganization">Name:</label>
      <input type="text" className="form-control" id="curNameOrganization"  placeholder="food shop"/>
    </div>
    <div className="form-create">
      <label for="availableFunds">Available funds:</label>
      <input type="text" className="form-control" id="availableFunds" placeholder="15000.00"/>
    </div>
    <br/>

    <button type="submit" className="btn btn-primary btn-lg">Save</button>
    <br/>
    <br/>
  </div>

  <div className="container-table-director">
    <table className="table table table-sm table-bordered">
        <thead>
          <tr>
            <th>Employees</th>
            <th>Requests to join</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>
                Jhon, Engineer, Employee <button type="button" className="btn btn-primary">Delete</button>
              </div>
            </td>
            <td>
              {/* name1, efficiency1 
              <button type="button" className="btn btn-primary">Accept</button> 
              <button type="button" className="btn btn-primary">Reject</button> */}
            </td>
          </tr>
          <tr>
            <td>
              <div>
                Max, Marketer, Analyst <button type="button" className="btn btn-primary">Delete</button>
              </div>
            </td>
            <td>
              {/* name2, efficiency2 
              <button type="button" className="btn btn-primary">Accept</button>
              <button type="button" className="btn btn-primary">Reject</button> */}
            </td>
          </tr>
        </tbody>
    </table>
    <button type="submit" className="btn btn-primary btn-lg btn-danger">Delete organization</button>
    <br/>
    <br/>
  </div>


  <div className="container-organization-info">
    <h1 className="head">Employee profile</h1>
    <p style={{marginBottom: '0px', paddingLeft: '4px',}}>Role: Director</p>
  
    <div className="row">
      <div className="col-sm-3 p-3" style={{lineHeight: '20px',}}>
        <label for="speciality1">Speciality:</label>
        <select className="form-select form-select-sm">
          <option>Engineer</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>
      <div className="col-sm-1 p-4">
        <button type="button" className="btn btn-primary" style={{lineHeight: '31px',}}>Save</button>
      </div>
    </div>
  </div>


      </>
    );
  }
}