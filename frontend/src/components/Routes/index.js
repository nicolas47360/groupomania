
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from '../../pages/Auth';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';

function index() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Auth} />
                <Route path='/home' exact component={Home} />
                <Route path='/profil' exact component={Profil} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );

}

export default index;