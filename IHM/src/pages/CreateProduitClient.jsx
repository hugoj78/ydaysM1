import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import CreateProductFrom from '../components/CreateProductClientForm'

export class CreateProduitClient extends Component {

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
            return (
                <div>
                    <CreateProductFrom/>
                </div>
            )
    }
}

export default CreateProduitClient;
