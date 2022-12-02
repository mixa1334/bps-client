import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth/auth.service";

import BusinessPlans from "./components/analyst/business_plans.component";
import OrganizationModeration from "./components/director/organization-moderation.component";
import Specialities from "./components/director/specialities.component";
import OrganizationInfo from "./components/employee/organization-info.component";
import Tasks from "./components/employee/tasks.component";
import Login from "./components/guest/login.component";
import Signup from "./components/guest/signup.component";
import FindOrganization from "./components/user/find-organization.component";
import Home from "./components/user/home.component";
import Profile from "./components/user/profile.component";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAnalystBoard: false,
      showDirectorBoard: false,
      showEmployeeBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        showAnalystBoard: user.roles.includes("ANALYST"),
        showDirectorBoard: user.roles.includes("DIRECTOR"),
        showEmployeeBoard: user.roles.includes("EMPLOYEE"),
        showUserBoard: user.roles.includes("USER"),
        currentUser: user,
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAnalystBoard: false,
      showDirectorBoard: false,
      showEmployeeBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAnalystBoard, showDirectorBoard, showEmployeeBoard, showUserBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            BPS
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/find_organization"} className="nav-link">
                  Find organization
                </Link>
              </li>
            )}

            {(showEmployeeBoard && !showDirectorBoard) && (
              <li className="nav-item">
                <Link to={"/organization_info"} className="nav-link">
                  Organization info
                </Link>
              </li>
            )}

            {showDirectorBoard && (
              <li className="nav-item">
                <Link to={"/organization_moderation"} className="nav-link">
                  Organization
                </Link>
              </li>
            )}

            {showEmployeeBoard && (
              <li className="nav-item">
                <Link to={"/tasks"} className="nav-link">
                  Tasks
                </Link>
              </li>
            )}

            {showAnalystBoard && (
              <li className="nav-item">
                <Link to={"/business_plans"} className="nav-link">
                  Business plans
                </Link>
              </li>
            )}

            {showDirectorBoard && (
              <li className="nav-item">
                <Link to={"/specialities"} className="nav-link">
                  Specialities
                </Link>
              </li>
            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/logout" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Signup
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/find_organization" element={<FindOrganization/>}/>

            <Route path="/organization_info" element={<OrganizationInfo/>} />
            <Route path="/tasks" element={<Tasks />} />

            <Route path="/business_plans" element={<BusinessPlans />} />

            <Route path="/organization_moderation" element={<OrganizationModeration/>}/>
            <Route path="/specialities" element={<Specialities/>}/>
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
