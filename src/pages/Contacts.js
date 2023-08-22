import React, { Component } from "react";
import { MdPhone, MdMail, MdHome, MdAccountBox } from "react-icons/md";
import Header from "./Header";


// const contactDetails = () => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//         .then(response => {
//             return response.json();
//         })
// };


class ContactCard extends Component {
    constructor(props) {
        super(props);
        this.cardClicked = this.cardClicked.bind(this);
    }

    cardClicked() {
        window.location.pathname = `/user/${this.props.id}`;
    }

    render() {
        return (
            <div className="card" key={this.props.id} onClick={this.cardClicked}>
                <span className="tooltiptext">Click to View Details</span>
                <div className="card-title">
                    {this.props.username}
                </div>
                <div className="info">
                    <p>
                        <MdAccountBox /> <b>Full Name:</b> {this.props.name}
                    </p>
                    <p>
                        <MdPhone /> <b>Phone:</b> {this.props.phone}
                    </p>
                    <p>
                        <MdMail /> <b>Email:</b> {this.props.email}
                    </p>
                    <p>
                        <MdHome /> <b>Address:</b> {this.props.address}
                    </p>
                </div>
            </div>
        )
    }
}

class Contacts extends Component {
    state = {
        users: [],
        isLoading: true,
        errors: null,
    }

    getUsers() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ users: data, isLoading: false })
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const { isLoading, users } = this.state;
        // console.log('@@68', users);

        return (
            <>
                <Header />
                <div className="content">
                    {!isLoading ? (
                        <div className="card-list">
                            {users.map(user => (
                                // <li key={user.id}>{user.name} {user.address.city}</li>
                                <ContactCard
                                    key={user.id}
                                    id={user.id}
                                    username={user.username}
                                    name={user.name}
                                    phone={user.phone}
                                    email={user.email}
                                    address={user.address.suite + ', ' + user.address.street + ', ' + user.address.city + ', ' + user.address.zipcode}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </>
        )
    }

}

export default Contacts;