
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from '../../pages/Auth';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Post from '../../pages/Post';

function index() {
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.token;
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Auth} />
                <Route path='/home' exact component={Home} />
                <Route path='/profil' exact component={Profil} />
                <Route path='/post' exact component={Post} />
            </Switch>
        </Router>
    );
}

export default index;