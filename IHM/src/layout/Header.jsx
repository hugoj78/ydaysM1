import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import PanierService from '../services/panier.service'
import { Badge, Col, Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "./css/Header.css";

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.PanierService = new PanierService();

        this.state = {
            title: '',
            clientData : [],
            numberOfProduct : this.PanierService.getLengthOnPanier(),
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.Auth = new AuthService();
        

        if (this.Auth.getToken() !== null) {
            const profil = this.Auth.getUserProfil();
            //console.log(profil);
            this.state.admin = profil.admin;
    
            this.Auth.getUserDetail(profil.id)
            .then(data => {
                this.setState({
                    clientData: data
                })
            })
        
        }
    }
    handleForm(event) {
        event.preventDefault();
        if(this.state.name !== '') {
            window.location = "../search/" + this.state.name;
        } 
      }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    disconnect() {
        this.Auth.disconnectUser()
        window.location = "/login"
    }

    render() {
        if (this.Auth.getToken() !== null) {
            return (
                <div>
                    <Navbar sticky="top" bg='' className="header" style={{backgroundColor: `#fbe882` }}>
                        <Navbar.Brand href="/">
                            <img
                            alt="logo"
                            src="/img/logoo.png"
                            width="50"
                            height="30"
                            className="d-inline-block align-top"/>{this.state.title}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                        

                        <Nav>
                        <Form onSubmit={this.handleForm} inline>
                            <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" name="name" onChange={this.handleChange}/>
                            <Button variant="outline-dark" type="submit"><img src="/img/search.png" alt='Search' width="20" height="20" style={{paddingBottom: 1 + 'px' }}></img></Button>
                        </Form>
                        <Col >    
                        <Link to={"/shopCart"}>                  
                                <img
                                src="/img/shop.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="logo"
                                />
                                <Badge variant="secondary">{this.state.numberOfProduct}</Badge>
                            </Link>  
                        </Col>
                        <Navbar.Text>
                        Connecté en tant que : <a href="/account">{this.state.clientData.firstname}</a>
                        </Navbar.Text>
                        <Col style={{paddingTop: 4 + 'px' }}>
                        <Button 
                            size="sm"
                            variant="outline-dark"
                            onClick={this.disconnect}>
                                Deconnecter
                            </Button>
                        </Col>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <br/>
                    <br/>
                </div>
            );
        } else {
            return (
                <div>
                <Navbar sticky="top" bg=''  className="header" style={{backgroundColor: `#fbe882` }}>
                    <Navbar.Brand href="/">
                        <img
                        alt="logo"
                        src="/img/logoo.png"
                        width="50"
                        height="30"
                        className="d-inline-block align-top"/>{this.state.title}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                    

                    <Nav>
                    <Form onSubmit={this.handleForm} inline>
                        <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" name="name" onChange={this.handleChange}/>
                        <Button variant="outline-dark" type="submit"><img src="/img/search.png" alt='Search' width="20" height="20" style={{paddingBottom: 1 + 'px' }}></img></Button>
                    </Form>
                    <Col>    
                        <Link to={"/shopCart"}>                  
                            <img
                            src="/img/shop.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="logo"
                            />
                            <Badge variant="secondary">{this.state.numberOfProduct}</Badge>
                        </Link>  
                    </Col>
                    <Navbar.Text>
                        <a href="/login">Se Connecter</a>
                    </Navbar.Text>
                    <Col>
                        <Navbar.Text>
                        <a href="/signup">S'inscrire</a>
                        </Navbar.Text>
                    </Col>
                    </Nav>
                    </Navbar.Collapse>

                </Navbar>
                <br/>
                <br/>
            </div>
            );
        }

    }
}
