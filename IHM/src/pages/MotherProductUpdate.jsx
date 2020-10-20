import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import EditMotherProduitForm from '../components/EditMotherProductForm'

export class MotherProductUpdate extends Component {

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
                <img
                alt="logo"
                src="/img/logoo.png"
                width="300"
                height="150"
                className="d-inline-block align-top"/>
                <br/>
                <br/>
                <br/>
                <EditMotherProduitForm id={this.state.id}/>
            </div>
        )
    }
}

export default MotherProductUpdate;