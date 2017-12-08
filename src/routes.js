import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Auth from './Auth/Auth';
import history from './history';

import Home from './Home/Home'; // The / route
import Profile from './Profile/Profile'; // The /profile route
import Chat from './Chat/Chat'; // The /chat route
import Callback from './Callback/Callback'; // The /callback route


const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if(/access_token|id_token|error/.test(nextState.location.hash)){
        auth.handleAuthentication();
    }
}

export const makeMainRoutes = () => {
    return (
        <Router history={history} component={App}>
            <div>
                {/* '/' route*/}
                <Route path="/" render={(props) => <App auth={auth}{...props} />} />
                {/* homepage route*/}
                <Route path="/home" render={(props) => <Home auth={auth}{...props} />} />
                {/* Chat route*/}
                <Route path="/chat" render={(props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home" />
                    ) : (
                        <Chat auth={auth} {...props} />
                        )
                    )} />
                {/* profile route*/}
                <Route path="/profile" render={(props) => (
                    !auth.isAuthenticated() ? (
                        <Redirect to="/home" />
                    ) : (
                        <Profile auth={auth} {...props} />
                    )
                )} />
                {/* callback route */}
                <Route path="/callback" render={(props) =>{
                handleAuthentication(props);
                return <Callback {...props} />
                }} />

            </div>
        </Router>
    );
}