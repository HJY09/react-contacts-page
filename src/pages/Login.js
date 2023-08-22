import React, { Component } from "react";
import { Navigate } from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem("token");
        console.log('@@8', token);

        let LoggedIn = true;
        if (token == null) {
            LoggedIn = false;
        }
        this.state = {
            username: "",
            password: "",
            LoggedIn
        };
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitForm(e) {
        e.preventDefault();
        const { username, password } = this.state;
        console.log('@@31', username)

        // login security
        if (username === "admin" && password === "admin") {
            localStorage.setItem("token", "admin1234567890");
            this.setState({
                LoggedIn: true
            });
        }
    }

    render() {
        if (this.state.LoggedIn) {
            console.log('@42 logged in')
            return (
                <Navigate to="/" />
            )
        }
        return (
            <div className="login">
                <div className="container">
                    <center><h1>Log In</h1></center>
                    <form onSubmit={this.submitForm}>
                        <div >
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                // id="user_login"
                                value={this.state.username}
                                onChange={this.onChange}
                                size="20"
                                placeholder="username"
                                required
                            />
                        </div>
                        <div >
                            <label >Password</label>
                            <input
                                type="password"
                                name="password"
                                // id="user_pass"
                                value={this.state.password}
                                onChange={this.onChange}
                                size="20"
                                placeholder="password"
                                required
                            />
                        </div>
                        <div className="login-button">
                            <input
                                type="submit"
                                // name="wp-submit"
                                // id="wp-submit"
                                value="Sign In"
                            />
                            <input type="button"
                                // name="login_cancel"
                                // id="login_cancel"
                                value="Cancel"
                            />
                        </div>
                    </form>
                </div>
                <div style={{ textAlign: "center", color: "green" }}>Login with username="admin" & password="admin"</div>
            </div>
        );
    }
}

export default Login;