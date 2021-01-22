import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
// custom
import HomeView from "../views/home/Home.view";
import AboutView from "../views/about/About.view";
import LoginView from "../views/login/Login.view";

const RouterApp: FunctionComponent = () => {
    return (
        <Router>
            <Switch>
                <Route path="/app" render={(props: any) => <DashboardLayout {...props}/>} />
                <Route path="/login" component={LoginView} />
                <Route path="/about" component={AboutView} />
                <Redirect from="/" to="/app" />
            </Switch>
        </Router>
    );
};

export default RouterApp;