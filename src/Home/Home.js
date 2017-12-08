import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    componentWillMount(){
        
        const { isAuthenticated, getProfile } = this.props.auth;

        if (isAuthenticated() ) {
            getProfile();
        }
    }
    login() {
        this.props.auth.login();
    }
    render(){
        const { isAuthenticated } = this.props.auth;
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Welcome to chat</h1>
                    {
                        !isAuthenticated() && (
                        <div>
                            <p>we need you to sign in with auth before u can enters</p>
                            <p><a className="btn btn primary btnk-lg" onClick={this.login.bind(this)}>login</a></p>
                        </div>
                    )
                    }
                    {
                        isAuthenticated() && (
                            <div>
                                <p>lets chat</p>
                                <Link className="btn btn-primary btn-lg" to="chat">Chat</Link>
                            </div>
                        )
                    }
                </div>

                {this.props.children }
            </div>

        );
    }
}
export default Home;