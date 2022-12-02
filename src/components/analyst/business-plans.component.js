import React, { Component } from "react";


export default class BusinessPlans extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
      <>
    
    <div className="container-buisness-tasks">
        <h1 className="head">Buisness plans</h1>
        <div className="container-buisness-task p-3 my-3 bg-primary text-white">
          <p>Title: Brand new product</p>
          <p>Status: approved</p>
          <p>Risks: no risks</p>
          <p>Opportunity: new customers</p>
          <p>Profit: 12000.00</p>
          <p>Deadline: 12-12-2022</p>
          <p>Tasks: make new product; make advertisment</p>
          <p>Completed tasks: 0</p>
        </div>
    </div>

    <div className="container">
        <hr/>
        <h1 className="head">Create new Buisness plan</h1>
    </div>

  <div className="container">
      <div className="container-create">
            <div className="form-create">
              <label for="Title">Title:</label>
              <input type="text" className="form-control" id="title"  placeholder="Enter title"/>
            </div>
            <div className="form-create">
              <label for="Necessary funds">Necessary funds:</label>
              <input type="text" className="form-control" id="funds" placeholder="Funds"/>
            </div>
            <div className="form-create">
              <label for="Opportunity">Opportunity:</label>
              <input type="text" className="form-control" id="opportunity" placeholder="Opportunity"/>
            </div>
            <div className="form-create">
              <label for="Profit">Profit:</label>
              <input type="text" className="form-control" id="profit" placeholder="Profit"/>
            </div>
            <div className="form-create">
              <label for="Deadline">Deadline:</label>
              <input type="text" className="form-control" id="deadline" placeholder="Deadline"/>
              <br/>
            </div>
      </div>

      <div className="container-table pb-5">
        <h1 className="head">Tasks:</h1>
        <ul className="list-group">
            <li className="list-group-item">
              <div className="container-create">
                <div className="form-create-buisness-tasks">
                  <label for="taskTitle_1">Task title:</label>
                  <input type="text" className="form-control" id="taskTitle_1"  placeholder="enter title"/>
                </div>
                <div className="form-create-buisness-tasks">
                  <label for="taskDescription_1">Description:</label>
                  <input type="text" className="form-control" id="taskDescription_1" placeholder="enter description"/>
                </div>
                <div className="form-create-buisness-tasks">
                  <label for="taskDeadline_1">DeadLine:</label>
                  <input type="text" className="form-control" id="taskDeadline_1" placeholder="enter deadLine"/>
                </div>
                <div className="form-create-buisness-tasks">
                  <label for="Nec speciality">Necessary speciality:</label>
                    <form>
                      <select className="form-select form-select-md">
                        <option>Engineer</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </form>
                </div>
              </div>
            </li>
            <br/>

            {/* other tasks (3) */}
        </ul>
        <button type="submit" className="btn btn-primary btn-lg">Create buisness plan</button>
    </div>
  </div>
      
      </>
    );
  }
}