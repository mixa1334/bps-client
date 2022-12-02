import React, { Component } from "react";

export default class Tasks extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
        <>
        
        <div className="container-table mt-3">
        <h1 className="head">Available tasks</h1>
        
        <table className="table  table-sm">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deadline: 9-12-2022 <br/> Title: make new product <br/> Description: make new product </td>
              <td>
                <button type="button" className="btn btn-primary btn-lg">Done</button>
              </td>
            </tr>
            <tr>
              <td>Deadline: 12-12-2022 <br/> Title: make a product ad<br/> Description: make a product ad</td>
              <td>
                <button type="button" className="btn btn-primary btn-lg ">Done</button>
              </td>
            </tr> 
          </tbody>
        </table>
    </div>
        
        </>
    );
  }
}