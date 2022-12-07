import React, { Component } from "react";
import AuthService from "../../services/auth/auth.service";
import UserService from "../../services/employee/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.getUserInfo = this.getUserInfo.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = {
      name: "",
      surname: "",
      age: 0,
      phoneNumber: "",
      completedTasks: 0,
      completedAfterDeadLine: 0,
      completedOnTime: 0,
      efficiency: 0,
      newName: "",
      newSurname: "",
      newAge: undefined,
      newPhoneNumber: "",
      newLogin: "",
      newPassword: ""
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo(){
    const userId = AuthService.getCurrentUser().userId;
    UserService.getInfo(userId)
    .then(response => {
      this.setState({
        name: response.name,
        surname: response.surname,
        age: response.age,
        phoneNumber: response.phoneNumber,
        completedTasks: response.completedTasks,
        completedAfterDeadLine: response.completedAfterDeadLine,
        completedOnTime: response.completedOnTime,
        efficiency: response.efficiency
      });
    });
  }

  onChangeName(e){
    this.setState({
      newName: e.target.value
    });
  }

  onChangeSurname(e){
    this.setState({
      newSurname: e.target.value
    });
  }

  onChangeAge(e){
    this.setState({
      newAge: e.target.value
    });
  }

  onChangePhoneNumber(e){
    this.setState({
      newPhoneNumber: e.target.value
    });
  }

  updateUserInfo(){
    var data = {
      name: this.state.newName ? this.state.newName : this.state.name,
      surname: this.state.newSurname ? this.state.newSurname: this.state.surname,
      age: this.state.newAge ? this.state.newAge : this.state.age,
      phoneNumber: this.state.newPhoneNumber ? this.state.newPhoneNumber : this.state.phoneNumber
    }
    const userId = AuthService.getCurrentUser().userId;
    UserService.updateInfo(userId, data)
    .then(()=>{
      window.location.reload(false);
    });
  }

  onChangeLogin(e){
    this.setState({
      newLogin: e.target.value
    });
  }

  changeLogin(){
    const newLogin = this.state.newLogin;
    if(newLogin){
      const userId = AuthService.getCurrentUser().userId;
      UserService.changeLogin(userId, newLogin)
      .then(response => {
        AuthService.updateToken(response.token);
        window.location.reload(false);
      })
    }
  }

  onChangePassword(e){
    this.setState({
      newPassword: e.target.value
    });
  }

  changePassword(){
    const newPassword = this.state.newPassword;
    if(newPassword){
      const userId = AuthService.getCurrentUser().userId;
      UserService.changePassword(userId, newPassword)
      .then(()=>{
        window.location.reload(false);
      });
    }
  }

  render() {
    const {name,
    surname,
    age,
    phoneNumber,
    completedTasks,
    completedAfterDeadLine,
    completedOnTime,
    efficiency} = this.state;

    return (
      <>
      
      <div className="container">
        <h1 className="head">Profile</h1>
        <div className="form-create">
          <label for="nameProfile">Name: {name}</label>
          <input type="text" className="form-control" id="nameProfile"  placeholder="new name"
          required value={this.state.newName} onChange={this.onChangeName}/>
        </div>
        <div className="form-create">
          <label for="surnameProfile">Surname: {surname}</label>
          <input type="text" className="form-control" id="surnameProfile" placeholder="new surname"
          required value={this.state.newSurname} onChange={this.onChangeSurname}/>
        </div>
        <div className="form-create">
          <label for="ageProfile">Age: {age}</label>
          <input type="text" className="form-control" id="ageProfile" placeholder="new age"
          required value={this.state.newAge} onChange={this.onChangeAge}/>
        </div>
        <div className="form-create">
          <label for="phoneProfile">Phone number: {phoneNumber}</label>
          <input type="text" className="form-control" id="phoneProfile" placeholder="new phone number (+375 (29) xxx-xx-xx)"
          required value={this.state.newPhoneNumber} onChange={this.onChangePhoneNumber}/>
        </div>
          
        <br/>
  
        <button type="submit" className="btn btn-primary btn-lg" onClick={this.updateUserInfo}>Save</button>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>

      <div className="container-table">
        <h1 className="head">Update login and password</h1>
        <br/>
        <div className="row">
            <div className="col"> 
              <input type="password" className="form-control" id="newLogin"  placeholder="Input new login"
              required value={this.state.newLogin} onChange={this.onChangeLogin}/>
            </div>  
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={this.changeLogin}>Update</button>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col"> 
              <input type="password" className="form-control" id="newPassword"  placeholder="Input new password"
              required value={this.state.newPassword} onChange={this.onChangePassword}/>
            </div>  
            <div className="col">
              <button type="button" className="btn btn-primary" onClick={this.changePassword}>Update</button>
            </div>
        </div>
        <br/>
      </div>

      <div className="container">
        <h3><b>Statistics:</b></h3>
        <h5>Compeled tasks: {completedTasks}</h5>
        <h5>Compeled after deadline: {completedAfterDeadLine}</h5>
        <h5>Compeled on time: {completedOnTime}</h5>
        <h5>Effeciency: {efficiency}</h5>
      </div>
      
      </>
    );
  }
}
