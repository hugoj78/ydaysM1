import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import ClientService from '../services/client.service';
import {Card, Col, Row, Container, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Profil',
            admin: false,
            clientData : []
        }

        this.Auth = new AuthService();
        this.Client = new ClientService();

        const profil = this.Auth.getUserProfil();
        //console.log(profil);
        this.state.admin = profil.admin;

        //const token = this.Auth.getToken();
        //console.log(token);

        this.Client.GetClientDetail(profil.id)
        .then(data => {
            this.setState({
                clientData: data
            })
        })
    }


    render() {
        if (this.profil !== "" && this.state.admin === false) {
            return (
                <Container >
                    <Row className="justify-content-md-center"> 
                    <img
                        alt="logo"
                        src="/img/logo.png"
                        width="300"
                        height="150"
                        className="d-inline-block align-top"/>
                    </Row>
                    <br/>
                    <br/>
                    <Row className="justify-content-md-center"> 
                        <Col md={6}>
                            <Card style={{ width: 20 + 'em' ,margin: 0 + ' auto', float: "none", marginBottom: 3 + 'em'}}>
                                <Card.Body>
                                    <Card.Title>{this.state.title}</Card.Title>
                                <hr/>
                                    <Card.Text>Adresse Email : {this.state.clientData.email}</Card.Text>
                                    <Card.Text>Nom : {this.state.clientData.lastname}</Card.Text>
                                    <Card.Text>Prénom : {this.state.clientData.firstname}</Card.Text>
                                    <Card.Link href={"/clientUpdate/" + this.state.clientData._id }>Modifier ses informations</Card.Link>
                                    <br/>
                                    <Card.Link href={"/clientPasswordUpdate/" + this.state.clientData._id }>Modifier son Mot de Passe</Card.Link>
                                </Card.Body>
                            </Card>
                            <Link to={"/voirProduitClient/" + this.state.clientData._id} style={{paddingRight: 20 + 'px' }}><Button className="btn btn-info">Vos produits à vendre</Button></Link>
                            <Link to={"/createProduitClient"} style={{paddingRight: 20 + 'px' }}><Button className="btn btn-info">Vendre un produit</Button></Link>
                            <Link to={"/invoice/" + this.state.clientData._id}><Button className="btn btn-info">Voir ses factures</Button></Link>
                            <br/><br/>
                        </Col>
                    </Row>
                </Container>
            );
        } else if(this.profil !== "" && this.state.admin === true) {
            return (
                <Container >
                    <Row className="justify-content-md-center"> 
                    <img
                        alt="logo"
                        src="/img/logoo.png"
                        width="300"
                        height="150"
                        className="d-inline-block align-top"/>
                    </Row>
                    <br/>
                    <br/>
                    <Row className="justify-content-md-center"> 
                        <Col md={6}>
                            <Card style={{ width: 20 + 'em' ,margin: 0 + ' auto', float: "none", marginBottom: 3 + 'em'}}>
                                <Card.Body>
                                    <Card.Title>{this.state.title}</Card.Title>
                                <hr/>
                                    <Card.Text>Adresse Email : {this.state.clientData.email}</Card.Text>
                                    <Card.Text>Nom : {this.state.clientData.lastname}</Card.Text>
                                    <Card.Text>Prénom : {this.state.clientData.firstname}</Card.Text>
                                    <Card.Link href={"/clientUpdate/" + this.state.clientData._id }> Modifier ses informations</Card.Link>
                                    <br/>
                                    <Card.Link href={"/clientPasswordUpdate/" + this.state.clientData._id }>Modifier son Mot de Passe</Card.Link>
                                    <br/>
                                    <hr/>
                                    <Card.Link href="/adminPage">Admin Page</Card.Link>
                                    <br/>
                                    <Card.Link href={"/model"}>Voir MCD</Card.Link>
                                </Card.Body>
                            </Card>
                            <Link to={"/voirProduitClient/" + this.state.clientData._id} style={{paddingRight: 20 + 'px' }}><Button className="btn btn-info">Vos produits à vendre</Button></Link>
                            <Link to={"/createProduitClient"} style={{paddingRight: 20 + 'px' }}><Button className="btn btn-info">Vendre un produit</Button></Link>
                            <Link to={"/invoice/" + this.state.clientData._id}><Button className="btn btn-info">Voir ses factures</Button></Link>
                            <br/><br/>
                        </Col>
                    </Row>
                </Container>
                
            );
        } else {
            return (
                <div>
                    <p>No one</p>
                </div>
            );
        }
    }
}

export default Home;