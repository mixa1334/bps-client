import React, { Component } from "react";

export default class Specialities extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }


  render() {
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
              <tr>
                <td>Name: engineer <br/> Disription: engineer</td>
                <td>
                  <button type="button" className="btn btn-primary">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Name: marketer <br/> Disription: marketer</td>
                <td>
                  <button type="button" className="btn btn-primary">Delete</button>
                </td>
              </tr>
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