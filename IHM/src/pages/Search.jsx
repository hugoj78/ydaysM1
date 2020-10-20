import React, { Component } from 'react';
import ProductService from '../services/product.service';
import { Button, Card, Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
            products: [],
            description : "Votre recherche n'a pas pu aboutir :/ Très la tristesse ! Néanmoins soyez sur de trouver votre bonheur sur notre ile"
        }

        this.ProductService = new ProductService();

        this.ProductService.GetProductByName(this.state.name)
        .then(data => {
            //console.log(data);
            this.setState({
                products: data
            })
        })
        
    }

    render() {
        if(this.state.products.length !== 0) {
            const prod = this.state.products.map((data, key) => (
                <Col key={key}>
                    <Card style={{ width: 25 + 'em' ,margin: 1 + 'em'}}>
                    <Card.Img variant="top" src={data.path} width="300" height="250"/>
                    <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        Prix : {data.price} €
                    </Card.Text>
                    <Link to={"/productDetail/" + data._id}><Button className="btn btn-info">Voir plus en détail</Button></Link>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Stock disponible : {data.stock}</small>
                    </Card.Footer>
                    </Card>
                </Col>
            ));
            return (
                <div>
                    <Container fluid>
                        <Row>
                            {prod}
                        </Row>
                    </Container>
                </div>
            );
        } else {
            return (
                <Container>
                    <Row>
                        <Col>
                            <br/><br/><br/>
                            <img
                            alt="logo"
                            src="/img/logoo.png"
                            width="300"
                            height="150"
                            className="d-inline-block align-top"/>
                            <br/><br/><br/><br/>
                            <p>{this.state.description}</p>
                        </Col>

                        <Col>
                        <br/><br/><br/>
                        <img
                            alt="nook"
                            src="/img/nook1.png"
                            width="635"
                            height="947"
                            className="d-inline-block align-top"/>
                        <br/><br/><br/>
                        </Col>
                        
                        <Col sm={12}>
                            <br/><br/><br/>
                            <p>{this.state.msgLove}</p>
                        </Col>
                    
                    </Row>
                </Container>
            )
        }
    }
}

export default Product;