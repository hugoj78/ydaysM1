import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import MotherProductService from '../services/motherProduct.service'
import {Form, Row, Col, Button, Container} from 'react-bootstrap'

export class EditMotherProductForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            path: '',
            type: '',
            products: []
        }

            this.handleChange = this.handleChange.bind(this);
            this.handleForm = this.handleForm.bind(this);
            this.Auth = new AuthService();
            this.MotherProduct = new MotherProductService();

            const profil = this.Auth.getUserProfil();
            this.state.adminUser = profil.admin;

            this.MotherProduct.GetProductDetail(props.id)
                .then(data => {
                    this.setState({
                        name: data.name,
                        path: data.path,
                        type: data.type,
                        products: data.products
                    })
                })
          }
          
        
          handleChange(event) {
            this.setState({
              [event.target.name]: event.target.value
            });
          }

          handleChangeArray = event => {
            this.setState({
                products: event.target.value.split(",")
            });
          }
        
          handleForm(event) {
            event.preventDefault();
            if(this.state.products[0] === "" && this.state.products.length === 1) {
                this.state.products.splice(0,1);
            }
            this.MotherProduct.UpdateProduct(this.props.id, this.state)
              .then(data => {
                window.location = "../adminPage"
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
                            <Form.Group controlId="formGroupNom">
                                <Form.Label>Nom :</Form.Label>
                                <Form.Control placeholder="Nom" name="name" value={this.state.name} onChange={this.handleChange} />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupStock">
                                <Form.Label>Type :</Form.Label>
                                <Form.Control placeholder="type" name="type" value={this.state.type} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupPath">
                                <Form.Label>Path :</Form.Label>
                                <Form.Control placeholder="path" name="path" value={this.state.path} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formGroupPrice">
                                <Form.Label>Produits :</Form.Label>
                                <Form.Control placeholder="produits" name="products" value={this.state.products} onChange={this.handleChangeArray}/>
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
                            AH BAH NON 418
                            
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default EditMotherProductForm;