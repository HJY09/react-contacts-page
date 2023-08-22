import React, { Component } from "react";
import { MdDensityMedium, MdAccountCircle, MdLogout, MdHome } from "react-icons/md";
import { Navigate } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: localStorage.getItem('token') ? true : false,
            hidden: true
        };
        this.clickDensity = this.clickDensity.bind(this);
    };

    clickDensity = () => {
        this.setState({
            hidden: !this.state.hidden,
        });
    };

    signOut = () => {
        localStorage.removeItem("token");
        this.setState({
            islogin: false
        });
    };


    render() {
        if (!this.state.islogin) {
            return <Navigate to="/login" />;
        }

        return (
            <header className="top-navigation">
                <h1 className="title" onClick={() => window.location.pathname = "/"}>Contacts</h1>
                <h1 className="density" onClick={this.clickDensity}><MdDensityMedium /></h1>
                <div className="side-navigation" style={this.state.hidden ? { display: 'none' } : {}} >
                    <h3 className="side-item" onClick={() => window.location.pathname = '/'}>< MdHome /> Home</h3>
                    <h3 className="side-item" onClick={() => window.location.pathname = '/profile'}><MdAccountCircle /> Profile</h3>
                    <h3 className="side-item" onClick={this.signOut}><MdLogout />Logout</h3>
                </div>
            </header>
        )
    }
}

export default Header;