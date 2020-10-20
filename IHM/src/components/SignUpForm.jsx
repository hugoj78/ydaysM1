import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import {Form, Row, Col, Button, Container} from 'react-bootstrap'

export class SignUpForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            admin: false
        }

        
            this.handleChange = this.handleChange.bind(this);
            this.handleForm = this.handleForm.bind(this);
            this.Auth = new AuthService();
          }
        
          handleChange(event) {
            this.setState({
              [event.target.name]: event.target.value
            });
          }
        
          handleForm(event) {
            event.preventDefault();
            this.Auth.SignUp(this.state)
              .then(data => {
                  window.location="./login"
              })
              .catch(err => {
                window.location.reload()
              })
          }

    render() {
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
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Mot de passe :</Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe" name="password" value={this.state.password} onChange={this.handleChange}/>
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
                    <Button variant="info" type="submit">
                        S'inscrire
                    </Button>
                    </Form>
                </Col>
                </Row>
                <Row><Col></Col></Row>
            </Container>
        );
    }
}

export default SignUpForm;