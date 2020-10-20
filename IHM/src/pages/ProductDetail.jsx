import React, { Component } from 'react';
import PanierService from '../services/panier.service';
import ProductService from '../services/product.service';
import { Button, Media, Container, Row, Col, Image, Form} from 'react-bootstrap'
// import { Link } from 'react-router-dom';

export class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            products: [],
            qty: 1   
        }

        this.ProductService = new ProductService();
        this.PanierService = new PanierService();

        this.handleChange = this.handleChange.bind(this);

        this.ProductService.GetProductDetail(this.state.id)
        .then(data => {
            this.setState({
                products: data
            })
        })
        
    }

    addPanier(id) {
        this.PanierService.AddPanier(id, this.state.qty, this.state.products.stock);
        window.location.reload();
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    render() {
            if(this.state.products.stock <= 0) {
                return (
                    <div>
                        <br/><br/><br/>
                        <Container fluid>
                        <Row>
                            <Col xs={5}>
                                 <Image variant="right" src={this.state.products.path}/>
                            </Col>
                            <Col xs={6}>
                                <Media>
                                    <Media.Body>
                                        <h5>{this.state.products.name}</h5>
                                        <p>Prix : {this.state.products.price} €</p>
                                        <p>Stock : {this.state.products.stock}</p>
                                        <br/>
                                        <br/>
    
                                        <Row className="justify-content-md-center">
                                            <Col xs={3}>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Nombre de produit</Form.Label>
                                                    <Form.Control type="number" step={1} min={1} max={this.state.products.stock} name="qty" value={this.state.qty} onChange={this.handleChange}/>
                                                    
                                                </Form.Group>
                                            </Col>
                                            <Col xs={3}>
                                            <Button disabled className="btn btn-info" onClick={(e) => this.addPanier(this.state.id)}>Ajouter Au Panier</Button>
                                            </Col>
                                        </Row>
                                        
                                    </Media.Body>
                                </Media>
                            </Col>
                        </Row>
                        </Container>
                    <br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/>
                </div>
            );
            } else {
                return (
                    <div>
                        <br/><br/><br/>
                        <Container fluid>
                        <Row>
                            <Col xs={5}>
                                 <Image variant="right" src={this.state.products.path}/>
                            </Col>
                            <Col xs={6}>
                                <Media>
                                    <Media.Body>
                                        <h5>{this.state.products.name}</h5>
                                        <p>Prix : {this.state.products.price} €</p>
                                        <p>Stock : {this.state.products.stock}</p>
                                        <br/>
                                        <br/>
    
                                        <Row className="justify-content-md-center">
                                            <Col xs={3}>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Nombre de produit</Form.Label>
                                                    <Form.Control type="number" step={1} min={1} max={this.state.products.stock} name="qty" value={this.state.qty} onChange={this.handleChange}/>
                                                    
                                                </Form.Group>
                                            </Col>
                                            <Col xs={3}>
                                            <Button className="btn btn-info" onClick={(e) => this.addPanier(this.state.id)}>Ajouter Au Panier</Button>
                                            </Col>
                                        </Row>
                                        
                                    </Media.Body>
                                </Media>
                            </Col>
                        </Row>
                        </Container>
                    <br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/>
                </div>
            );
            }
    }
}

export default ProductDetail;