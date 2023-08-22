import React, { Component } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MdPhone, MdMail, MdHome, MdPersonPin, MdPageview } from "react-icons/md";
import Header from "./Header";



class AddressMap extends Component {

    render() {
        const redOptions = {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
        };
        const center = [this.props.lat, this.props.lng];
        console.log('@@24', center);

        return (
            <MapContainer center={center} zoom={3} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMarker center={center} pathOptions={redOptions} radius={10}>
                    <Popup>{this.props.popUp}</Popup>
                </CircleMarker>
            </MapContainer>
        )
    }
}


class UserDetail extends Component {

    state = {
        user: null,
        isLoading: true,
        errors: null,
    }

    getUserDetail() {
        const url_path = window.location.pathname;
        const id = url_path.split('/')[2];
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ user: data, isLoading: false })
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getUserDetail();
    }

    render() {
        const { isLoading, user } = this.state;
        // console.log('@@59', user);

        return (
            <>
                <Header />
                <div className="content">
                    {!isLoading ? (
                        <div className="user-detail" key={user.id}>
                            <div className="name">
                                <h2 >{user.username}</h2>
                                {/* <h3 ><b>{user.username}</b></h3> */}
                            </div>
                            <div className="contact-container">
                                <p className="contact"><MdPersonPin /><b>Full Name:</b> {user.name}</p>
                                <p className="contact"><MdPhone /><b>Phone:</b> {user.phone}</p>
                            </div>
                            <div className="contact-container">
                                <p className="contact">
                                    <MdMail /> <b>Email:</b> <a href={"mailto:" + user.email}>
                                        {user.email}
                                    </a>
                                </p>
                                <p className="contact">
                                    <MdPageview /> <b>Website:</b> <a href={user.website}>
                                        {user.website}
                                    </a>
                                </p>
                            </div>
                            <div className="contact-container">
                                <p className="address"><MdHome /> <b>Address:</b> {user.address.suite + ', ' + user.address.street + ', ' + user.address.city + ', ' + user.address.zipcode}</p>
                            </div>
                            <AddressMap
                                lat={user.address.geo.lat}
                                lng={user.address.geo.lng}
                                popUp={user.address.suite + ', ' + user.address.street + ', ' + user.address.city + ', ' + user.address.zipcode}
                            />
                        </div>

                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </>
        )
    }
}

export default UserDetail;