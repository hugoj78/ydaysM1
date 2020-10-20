import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import EditClientForm from '../components/EditClientForm'

export class ClientUpdate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            admin: false,
            id: props.match.params.id
        }

        this.Auth = new AuthService();

        const profil = this.Auth.getUserProfil();
        this.state.admin = profil.admin;
        

    }

    render() {
        return (
            <div>
                <br/>
                {/* <h1> {this.state.title} </h1> */}
                <img
                alt="logo"
                src="/img/logoo.png"
                width="300"
                height="150"
                className="d-inline-block align-top"/>
                <br/>
                <br/>
                <br/>
                <EditClientForm id={this.state.id}/>
            </div>
        )
    }
}

export default ClientUpdate;