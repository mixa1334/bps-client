import React, { Component } from "react";
import AuthService from "../../services/auth/auth.service";
import BusinessPlanService from "../../services/plan/business-plan.service";
import TaskService from "../../services/plan/task.service";
import SpecialityService from "../../services/organization/speciality.service";


export default class BusinessPlans extends Component {
  constructor(props) {
    super(props);

    this.loadInfo = this.loadInfo.bind(this);
    this.createNewBusinessPlan = this.createNewBusinessPlan.bind(this);
    this.onChangeBusinessPlnaTitle = this.onChangeBusinessPlnaTitle.bind(this);
    this.onChangeBusinessPlanNecessaryFunds = this.onChangeBusinessPlanNecessaryFunds.bind(this);
    this.onChangeBusinessPlanOpportuntity = this.onChangeBusinessPlanOpportuntity.bind(this);
    this.onChangeBusinessPlanProfit = this.onChangeBusinessPlanProfit.bind(this);
    this.onChangeBusinessPlanDeadline = this.onChangeBusinessPlanDeadline.bind(this);
    this.onChangeBusinessPlanRisks = this.onChangeBusinessPlanRisks.bind(this);

    this.onChangeTaskSpecialityId = this.onChangeTaskSpecialityId.bind(this);
    this.onChangeTaskBusinessPlanId = this.onChangeTaskBusinessPlanId.bind(this);
    this.onChangeTaskTitle = this.onChangeTaskTitle.bind(this);
    this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
    this.onChangeTaskDeadline = this.onChangeTaskDeadline.bind(this);
    this.createNewTask = this.createNewTask.bind(this);

    this.state = {
      businessPlans: [],
      specialities: [],

      newPlanTitle: "",
      newPlanNecessaryFunds: 0,
      newPlanOpportuntity: "",
      newPlanProfit: 0,
      newPlanDeadline: "",
      newPlanRisks: "",

      newTaskTitle: "",
      newTaskDescription: "",
      newTaskDeadline: "",
      newTaskSpecialityId: 0,
      newTaskBusinessPlanId: 0
    };
  }

  componentDidMount() {
    this.loadInfo();
  }

  loadInfo(){
    const ordId = AuthService.getCurrentUser().organizationId;
    BusinessPlanService.getAllBusinessPlans(ordId)
    .then(response => {
      this.setState({
        businessPlans: response.businessPlans,
        newTaskBusinessPlanId: response.businessPlans[0].id
      });
    });
    SpecialityService.getAllByOrgId(ordId)
    .then(response => {
      this.setState({
        specialities: response.specialities,
        newTaskSpecialityId: response.specialities[0].id
      });
    });
  }

  onChangeBusinessPlnaTitle(e){
    this.setState({
      newPlanTitle: e.target.value
    });
  }

  onChangeBusinessPlanNecessaryFunds(e){
    this.setState({
      newPlanNecessaryFunds: e.target.value
    });
  }

  onChangeBusinessPlanOpportuntity(e){
    this.setState({
      newPlanOpportuntity: e.target.value
    });
  }

  onChangeBusinessPlanProfit(e){
    this.setState({
      newPlanProfit: e.target.value
    });
  }

  onChangeBusinessPlanDeadline(e){
    this.setState({
      newPlanDeadline: e.target.value
    });
  }

  onChangeBusinessPlanRisks(e){
    this.setState({
      newPlanRisks: e.target.value
    });
  }

  createNewBusinessPlan(){
    var data = {
      title: this.state.newPlanTitle,
      necessaryFunds: this.state.newPlanNecessaryFunds,
      opportunity: this.state.newPlanOpportuntity,
      profit: this.state.newPlanProfit,
      deadline: this.state.newPlanDeadline,
      risks: this.state.newPlanRisks
    };

    const orgId = AuthService.getCurrentUser().organizationId;
    BusinessPlanService.createNewPlan(orgId, data)
    .then(()=>{
      window.location.reload(false);
    });
  }

  onChangeTaskTitle(e){
    this.setState({
      newTaskTitle: e.target.value
    });
  }

  onChangeTaskDescription(e){
    this.setState({
      newTaskDescription: e.target.value
    });
  }

  onChangeTaskDeadline(e){
    this.setState({
      newTaskDeadline: e.target.value
    });
  }

  onChangeTaskSpecialityId(e){
    this.setState({
      newTaskSpecialityId: e.target.value
    });
  }

  onChangeTaskBusinessPlanId(e){
    this.setState({
      newTaskBusinessPlanId: e.target.value
    });
  }

  createNewTask(){
    var data = {
      title: this.state.newTaskTitle,
      description: this.state.newTaskDescription,
      deadline: this.state.newTaskDeadline,
      necessarySpecialityId: this.state.newTaskSpecialityId
    };
    const orgId = AuthService.getCurrentUser().organizationId;
    const planId = this.state.newTaskBusinessPlanId;
    TaskService.createNewTask(orgId, planId, data)
    .then(()=>{
      window.location.reload(false);
    });
  }

  render() {
    const { businessPlans, specialities }= this.state;

    return (
      <>
    
    <div className="container-buisness-tasks">
        <h1 className="head">Buisness plans</h1>

        {businessPlans && businessPlans.map((plan)=>(
                <div className="container-buisness-task p-3 my-3 bg-primary text-white">
                  <p>Title: {plan.title}</p>
                  <p>Status: {plan.status}</p>
                  <p>Risks: {plan.businessPlanSpecification.risks}</p>
                  <p>Opportunity: {plan.businessPlanSpecification.opportunity}</p>
                  <p>Profit: {plan.businessPlanSpecification.profit}</p>
                  <p>Necessary funds: {plan.businessPlanSpecification.necessaryFunds}</p>
                  <p>Deadline: {plan.businessPlanStatistics.deadline}</p>
                  <p>Completed tasks: {plan.businessPlanStatistics.completedTasks}</p>
                  <p>All tasks: {plan.businessPlanStatistics.allTasks}</p>
                  <p>Tasks: </p>
                  {plan.tasks && plan.tasks.map((task, index)=>(
                    <>
                    <p>
                      {index+1} Title: {task.title} Description: {task.description}
                    </p>
                    <p>
                      Deadline: {task.deadline}
                    </p>
                    </>
                  ))}
                </div>
        ))}
    </div>

    <div className="container">
        <hr/>
        <h1 className="head">Create new Buisness plan</h1>
    </div>

  <div className="container">
      <div className="container-create">
            <div className="form-create">
              <label for="Title">Title:</label>
              <input type="text" className="form-control" id="title"  placeholder="Enter title"
              required value={this.state.newPlanTitle} onChange={this.onChangeBusinessPlnaTitle}/>
            </div>
            <div className="form-create">
              <label for="Necessary funds">Necessary funds:</label>
              <input type="number" className="form-control" id="funds" placeholder="Funds"
              required value={this.state.newPlanNecessaryFunds} onChange={this.onChangeBusinessPlanNecessaryFunds}/>
            </div>
            <div className="form-create">
              <label for="Risks">Risks:</label>
              <input type="text" className="form-control" id="risks" placeholder="Deadline"
              required value={this.state.newPlanRisks} onChange={this.onChangeBusinessPlanRisks}/>
            </div>
            <div className="form-create">
              <label for="opportunity">Opportunity:</label>
              <input type="text" className="form-control" id="opportunity" placeholder="Opportunity"
              required value={this.state.newPlanOpportuntity} onChange={this.onChangeBusinessPlanOpportuntity}/>
            </div>
            <div className="form-create">
              <label for="profit">Profit:</label>
              <input type="number" className="form-control" id="profit" placeholder="Profit"
              required value={this.state.newPlanProfit} onChange={this.onChangeBusinessPlanProfit}/>
            </div>
            <div className="form-create">
              <label for="deadlineBP">Deadline:</label>
              <input type="text" className="form-control" id="deadlineBP" placeholder="Deadline"
              required value={this.state.newPlanDeadline} onChange={this.onChangeBusinessPlanDeadline}/>
              <br/>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" onClick={this.createNewBusinessPlan}>Create buisness plan</button>
      </div>

      <div className="container-table pb-5">
        <h1 className="head">Create new task:</h1>
        <ul className="list-group">
            <li className="list-group-item">
              <div className="container-create">
                <div className="form-create-buisness-tasks">
                  <label for="taskTitle_1">Task title:</label>
                  <input type="text" className="form-control" id="taskTitle_1"  placeholder="enter title"
                  required value={this.state.newTaskTitle} onChange={this.onChangeTaskTitle}/>
                </div>
                <div className="form-create-buisness-tasks">
                  <label for="taskDescription_1">Description:</label>
                  <input type="text" className="form-control" id="taskDescription_1" placeholder="enter description"
                  required value={this.state.newTaskDescription} onChange={this.onChangeTaskDescription}/>
                </div>
                <div className="form-create-buisness-tasks">
                  <label for="taskDeadline_1">DeadLine:</label>
                  <input type="text" className="form-control" id="taskDeadline_1" placeholder="enter deadLine"
                  required value={this.state.newTaskDeadline} onChange={this.onChangeTaskDeadline}/>
                </div>
                <div className="form-create-buisness-tasks">
                  <label for="speciality-bp-select">Necessary speciality:</label>
                    <form>
                      <select className="form-select form-select-md" id="speciality-bp-select"
                      onChange={this.onChangeTaskSpecialityId}
                      >
                        {specialities && specialities.map((spec)=>(
                          <option value={spec.id}>{spec.name}</option>
                        ))}
                      </select>
                    </form>
                </div>

                <div className="form-create-buisness-tasks">
                  <label for="select">Business plan:</label>
                    <form>
                      <select className="form-select form-select-md" id="bp-select"
                      onChange={this.onChangeTaskBusinessPlanId}>
                        {businessPlans && businessPlans.map((plan)=>(
                          <option value={plan.id}>{plan.title}</option>
                        ))}
                      </select>
                    </form>
                </div>
              </div>
            </li>
            <br/>
        </ul>
        <button type="submit" className="btn btn-primary btn-lg" onClick={this.createNewTask}>Create task</button>
    </div>
  </div>
      
      </>
    );
  }
}