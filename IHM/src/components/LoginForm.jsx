import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import {Form, Row, Col, Button, Container} from 'react-bootstrap'

export class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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
    this.Auth.login(this.state)
      .then(data => {
        if(data.token !== null) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('admin', data.admin);
          window.location = "/"
        } else {
          window.location.reload();
        }
        
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
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Adresse Email :</Form.Label>
                <Form.Control required type="email" placeholder="Adresse Email" name="email" value={this.state.email} onChange={this.handleChange} />
              </Form.Group>
              <br/>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Mot de passe :</Form.Label>
                <Form.Control required type="password" placeholder="Mot de passe" name="password" value={this.state.password} onChange={this.handleChange}/>
              </Form.Group>
              <br/>
              <br/>
              <Button variant="info" type="submit">
                Se Connecter
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;