import React, { Component } from 'react'
import AuthService from '../services/auth.service'
import ProduitService from '../services/product.service'
import {Form, Row, Col, Button, Container} from 'react-bootstrap'

export class EditProduitForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            stock: '',
            path: '',
            price: '',
            create_date: '',
            invoices: [],
            idmotherproduct: '',
            idclient: ''
        }

            this.handleChange = this.handleChange.bind(this);
            this.handleForm = this.handleForm.bind(this);
            this.Auth = new AuthService();
            this.Product = new ProduitService();

            const profil = this.Auth.getUserProfil();
            this.state.adminUser = profil.admin;

            this.Product.GetProductDetail(props.id)
                .then(data => {
                    this.setState({
                        name: data.name,
                        stock: data.stock,
                        path: data.path,
                        price: data.price,
                        create_date: data.create_date,
                        invoices: data.invoices,
                        idmotherproduct: data.idmotherproduct,
                        idclient: data.idclient
                    })
                    console.log(this.state);
                })
          }
          
        
          handleChange(event) {
            this.setState({
              [event.target.name]: event.target.value
            });
          }
        
          handleForm(event) {
            event.preventDefault();
            console.log(this.state.invoices);
            if(this.state.invoices[0] === "" && this.state.invoices.length === 1) {
                this.state.invoices.splice(0,1);
            }

            this.Product.UpdateProduct(this.props.id, this.state)
              .then(data => {
                window.location = "../adminPage"
              })
              .catch(err => {
                console.log(err);
              })
          }
          
          handleChangeArray = event => {
            this.setState({
                invoices: event.target.value.split(",")
            });
          }

    render() {
        if(this.state.adminUser) {
            return(
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="4"> 
                            <Form onSubmit={this.handleForm}>
                            <Form.Group>
                                <Form.Label>Nom :</Form.Label>
                                <Form.Control placeholder="Nom" name="name" value={this.state.name} onChange={this.handleChange} />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Stock :</Form.Label>
                                <Form.Control type="number" placeholder="stock" name="stock" value={this.state.stock} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Path :</Form.Label>
                                <Form.Control placeholder="path" name="path" value={this.state.path} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Prix :</Form.Label>
                                <Form.Control type="number" placeholder="prix" name="price" value={this.state.price} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Date Creation :</Form.Label>
                                <Form.Control placeholder="Date Creation" name="create_date" value={this.state.create_date} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>Facture(s) :</Form.Label>
                                <Form.Control placeholder="Facture(s)" name="invoices" value={this.state.invoices} onChange={this.handleChangeArray}/>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>idmotherproduct :</Form.Label>
                                <Form.Control placeholder="idmotherproduct" name="idmotherproduct" value={this.state.idmotherproduct} onChange={this.handleChange}/>
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label>idclient :</Form.Label>
                                <Form.Control placeholder="idclient" name="idclient" value={this.state.idclient} onChange={this.handleChange}/>
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
                                Modifier Produit
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

export default EditProduitForm;