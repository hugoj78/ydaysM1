import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import MotherProductService from '../services/motherProduct.service'
import {Form, Row, Col, Button, Container} from 'react-bootstrap'


export class CreateMotherProductFrom extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            path: '',
            type: '',
            products: []
        }

            this.handleChange = this.handleChange.bind(this);
            this.handleForm = this.handleForm.bind(this);
            this.Auth = new AuthService();
            this.Product = new MotherProductService();
            
          }
        
          handleChange(event) {
            this.setState({
              [event.target.name]: event.target.value
            });
          }
        
          handleForm(event) {
            event.preventDefault();
            // eslint-disable-next-line
            this.state.path = this.state.path.replace("C:\\fakepath\\", "/Users/hugo/Pictures/Newton/");
            console.log(this.state);
            this.Product.CreateProduct(this.state)
              .then(data => {
                window.location = "adminPage"
              })
              .catch(err => {
                console.log(err);
              })
          }

          onImageUpload = event => {
            this.setState({
                path: event.target.value
            });
          }

          handleChangeArray = event => {
            this.setState({
                products: event.target.value.split(",")
            });
          }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                <Col md="4"> 
                    <Form onSubmit={this.handleForm}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Nom du produit :</Form.Label>
                        <Form.Control placeholder="Nom du prodruit" name="name" onChange={this.handleChange} />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formGroupType">
                        <Form.Label>Type du produit</Form.Label>
                        <Form.Control placeholder="Type du Produit" name="type" onChange={this.handleChange}/>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formGroupImg">
                        <Form.Label>Image du produit :</Form.Label>
                        {/* <Form.Control placeholder="Path du produit" name="path" onChange={this.handleChange} /> */}
                        <Form.File 
                            name="path"
                            label="Choisir image produit"
                            custom
                            onChange={this.onImageUpload}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="formGroupProducts">
                        <Form.Label>Tableau des produits liés :</Form.Label>
                        <Form.Control  placeholder="id des Produits" name="products" onChange={this.handleChangeArray}/>
                    </Form.Group>
                    <br/>
                    <br/>
                    <Button variant="info" type="submit">
                        Créer Produit mère
                    </Button>
                    <br/><br/>
                    <br/><br/>
                    <br/>
                    </Form>
                </Col>
                </Row>
            </Container>
        );
    }
}

export default CreateMotherProductFrom;