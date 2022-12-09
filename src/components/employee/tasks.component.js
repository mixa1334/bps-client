import React, { Component } from "react";
import AuthService from "../../services/auth/auth.service";
import TaskService from "../../services/plan/task.service";

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.loadAllTasks = this.loadAllTasks.bind(this);
    this.completeTask = this.completeTask.bind(this);

    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    this.loadAllTasks();
  }

  loadAllTasks(){
    const user = AuthService.getCurrentUser();
    TaskService.getAllEmployeeTasks(user.organizationId, user.profileId)
    .then(response => {
      this.setState({
        tasks: response.tasks
      });
    });
  }

  completeTask(planId, taskId){
    const orgId = AuthService.getCurrentUser().organizationId;
    TaskService.completeTask(orgId, planId, taskId)
    .then(()=>{
      window.location.reload(false);
    });
  }

  render() {

    const { tasks } = this.state;

    return (
        <>
        
        <div className="container-table mt-3">
        <h1 className="head">Available tasks</h1>
        {tasks && tasks.length < 1 && (
          <div className="container">
            <header className="jumbotron">
              <h3>There is no tasks available!</h3>
            </header>
          </div>  
        )}
        <table className="table  table-sm">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map((task) => (
                <tr>
                  <td>Deadline: {task.deadline} <br/> Title: {task.title} <br/> Description: {task.description}</td>
                  <td>
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => this.completeTask(task.businessPlanId, task.id)}>Done</button>
                  </td>
                </tr>         
            ))}
          </tbody>
        </table>
    </div>
        </>
    );
  }
}