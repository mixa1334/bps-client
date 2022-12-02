import React, { Component } from "react";

export default class FindOrganization extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
      <>
      
      <div className="container-create">
      <h1 className="head">Create new organization</h1>
      <div className="form-create">
        <label for="nameOrganization">Name</label>
        <input type="text" className="form-control" id="nameOrganization"  placeholder="enter name"/>
      </div>
      <div className="form-create">
        <label for="funds">Funds</label>
        <input type="text" className="form-control" id="funds" placeholder="funds"/>
      </div>
      <br/>
      <button type="submit" className="btn btn-primary btn-lg">Create</button>
    </div>

    <div className="container-table mt-3">
      <h1 className="head">Available organization</h1>
      <table className="table table-borderless table-sm">
        <thead>
          <tr>
            <th>Name organization</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Food shop</td>
            <td><button type="button" className="btn btn-primary">Send request</button></td>
          </tr>
        </tbody>
      </table>
    </div>
      
      </>
    );
  }
}