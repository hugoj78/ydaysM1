import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import ProductService from '../services/product.service'
import MotherProductService from '../services/motherProduct.service'
import {Form, Row, Col, Button, Container} from 'react-bootstrap'


export class CreateProductFrom extends Component {

    constructor() {
        super();

        this.state = {
            stock: '',
            price: '',
            idmotherproduct: '',
            motherProducts : []
        }

            this.handleChange = this.handleChange.bind(this);
            this.handleChangeSelect = this.handleChangeSelect.bind(this);
            this.handleForm = this.handleForm.bind(this);
            this.Auth = new AuthService();
            this.Product = new ProductService();
            this.MotherProduct = new MotherProductService();

            this.MotherProduct.ReadProduct()
            .then(data => {
                //console.log(data);
                this.setState({
                    motherProducts: data
                })
                this.setState({
                    idmotherproduct : this.state.motherProducts[0]._id
                })
            })

            
            
    }
        
          handleChange(event) {
            this.setState({
              [event.target.name]: event.target.value
            });
          }

          handleChangeSelect(event) {

            for (let index = 0; index < this.state.motherProducts.length; index++) {
                const element = this.state.motherProducts[index].name;

                if(event.target.value === element) {
                    this.setState({
                        idmotherproduct : this.state.motherProducts[index]._id
                      });
                }
                
            }
            //console.log(this.state.idmotherproduct);
            
          }
        
          handleForm(event) {
            event.preventDefault();
            //console.log(this.state);
            this.Product.CreateProduct(this.state)
              .then(data => {
                window.location = "/"
              })
              .catch(err => {
                console.log(err);
              })
          }


    render() {
        const listMotherProduct = this.state.motherProducts.map((data, key) => (
            <option key={key}>{data.name}</option>
        ));
        return (
            <Container>
                <Row className="justify-content-md-center">
                <Col md="4"> 
                    <Form onSubmit={this.handleForm}>
                        <Form.Group controlId="formGroupStock">
                            <Form.Label>Stock du produit</Form.Label>
                            <Form.Control type="number" min={0} placeholder="Stock du Produit" name="stock" onChange={this.handleChange}/>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="formGroupPrice">
                            <Form.Label>Prix du produit :</Form.Label>
                            <Form.Control type="number" min={0} placeholder="Prix du Produit" name="price" onChange={this.handleChange}/>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Produit</Form.Label>
                            <Form.Control as="select" name="idmotherproduct" onChange={this.handleChangeSelect}>
                                {listMotherProduct}
                            </Form.Control>
                        </Form.Group>
                        <br/>
                        <br/>
                        <Button variant="info" type="submit">
                            Créer Produit
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

export default CreateProductFrom;