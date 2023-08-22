import React, { Component } from "react";
import Header from "./Header";
import { MdRemoveRedEye } from "react-icons/md";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { hidden: true }
    }

    showHidden = () => {
        this.setState({ hidden: !this.state.hidden });
    };

    render() {
        const hiddenInfo = this.state.hidden ? "*********" : "Here are some hidden information...";

        return (
            <>
                <Header />
                <div className="content">
                    <div className="profile">
                        <h1> Profile </h1>
                        <p>Name: admin</p>
                        <p>Hidden Information: {hiddenInfo} <MdRemoveRedEye onClick={this.showHidden} style={this.state.hidden ? {} : { display: 'none' }} /></p>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile