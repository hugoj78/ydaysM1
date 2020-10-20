import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import ClientService from '../services/client.service'
import {Form, Row, Col, Button, Container} from 'react-bootstrap'

export class EditClientForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

            this.handleChange = this.handleChange.bind(this);
            this.handleForm = this.handleForm.bind(this);
            this.Auth = new AuthService();
            this.Client = new ClientService();

            this.Client.GetClientDetail(props.id)
                .then(data => {
                    this.setState({
                        email: data.email
                    })
                })
          }
        
          handleChange(event) {
            this.setState({
              [event.target.name]: event.target.value
            });
          }
        
          handleForm(event) {
            event.preventDefault();
            this.Client.UpdatePasswordClient(this.props.id, this.state)
              .then(data => {
                window.location = "../Account"
              })
              .catch(err => {
                console.log(err);
              })
          }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="4"> 
                        <Form onSubmit={this.handleForm}>
                            <Form.Group as={Row} controlId="formPlaintextEmail" className="rounded mb-0"  style={{backgroundColor: 'white'}}>
                                <Form.Label column sm="2">
                                Email
                                </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={this.state.email} />
                                </Col>
                            </Form.Group>

                            <br/>
                            <Form.Group as={Row} controlId="formGroupPassword" className="rounded mb-0" style={{backgroundColor: 'white'}}>
                                <Form.Label column sm="5" >Mot de passe :</Form.Label>
                                <Col sm="7">
                                    <Form.Control plaintext type="password" placeholder="Mot de Passe" name="password" value={this.state.password} onChange={this.handleChange}/>
                                </Col>
                            </Form.Group>
                            <br/>
                            <br/>
                            <Button variant="info" type="submit">
                                Modifier mon mot de passe
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

export default EditClientForm;