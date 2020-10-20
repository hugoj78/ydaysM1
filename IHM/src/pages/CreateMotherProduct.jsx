import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import CreateMotherProductFrom from '../components/CreateMotherProductFrom'

export class CreateMotherProduct extends Component {

    constructor() {
        super();
        this.state = {
            admin: false
        }

        this.Auth = new AuthService();

        const profil = this.Auth.getUserProfil();
        this.state.admin = profil.admin;

    }


    render() {
        if (this.state.admin) {
            return (
                <div>
                    <CreateMotherProductFrom/>
                </div>
            )
        } else {
            return (
                <div>
                    <p>You don't have the rights</p>
                </div>
            );
        }
    }
}

export default CreateMotherProduct;