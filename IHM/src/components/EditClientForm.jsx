import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import ClientService from '../services/client.service'
import {Form, Row, Col, Button, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class EditClientForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            admin: false,
            adminUser: false,
            switch1: false
        }

            this.handleChange = this.handleChange.bind(this);
            this.handleForm = this.handleForm.bind(this);
            this.Auth = new AuthService();
            this.Client = new ClientService();

            const profil = this.Auth.getUserProfil();
            this.state.adminUser = profil.admin;

            this.Client.GetClientDetail(props.id)
                .then(data => {
                    this.setState({
                        email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        admin: data.admin,
                        switch1: data.admin
                    })
                    console.log(this.state);
                })
          }
          
        
          handleChange(event) {
            this.setState({
              [event.target.name]: event.target.value
            });
          }

          handleSwitchChange = nr => () => {
            let switchNumber = `switch${nr}`;
            this.setState({
              [switchNumber]: !this.state[switchNumber],
              admin: !this.state.switch1
            });
          }
        
          handleForm(event) {
            event.preventDefault();
            //console.log(this.state);
            this.Client.UpdateClient(this.props.id, this.state)
              .then(data => {
                window.location = "../Account"
              })
              .catch(err => {
                console.log(err);
              })
          }

    render() {
        if(this.state.adminUser) {
            return(
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="4"> 
                            <Form onSubmit={this.handleForm}>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Adresse Email :</Form.Label>
                                <Form.Control type="email" placeholder="Adresse Email" name="email" value={this.state.email} onChange={this.handleChange} />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupFirstname">
                                <Form.Label>Prénom :</Form.Label>
                                <Form.Control placeholder="Prénom" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupLastname">
                                <Form.Label>Nom :</Form.Label>
                                <Form.Control placeholder="Nom" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupLastname">
                                <Form.Label>Admin :</Form.Label>
                                <Form.Check  
                                    type="switch"
                                    id="custom-switch"
                                    label="True ou False"
                                    name="admin"
                                    checked={this.state.switch1} 
                                    onChange={this.handleSwitchChange(1)}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password :</Form.Label>
                                <Form.Label></Form.Label>
                                <Link to={"/clientPasswordUpdate/" + this.props.id}><Button className="btn btn-danger">Changer mot de passe</Button></Link>
                            </Form.Group>
                            <br/>
                            <br/>
                            <Button variant="info" type="submit">
                                Modifier son profil
                            </Button>
                            <br/><br/>
                            <br/><br/>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="4"> 
                            <Form onSubmit={this.handleForm}>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Adresse Email :</Form.Label>
                                <Form.Control type="email" placeholder="Adresse Email" name="email" value={this.state.email} onChange={this.handleChange} />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupFirstname">
                                <Form.Label>Prénom :</Form.Label>
                                <Form.Control placeholder="Prénom" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupLastname">
                                <Form.Label>Nom :</Form.Label>
                                <Form.Control placeholder="Nom" name="lastname" value={this.state.lastname} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <br/>
                            <Button variant="info" type="submit">
                                Modifier son profil
                            </Button>
                            <br/><br/>
                            <br/><br/>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default EditClientForm;