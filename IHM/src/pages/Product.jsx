import React, { Component } from 'react';
import ProductService from '../services/product.service';
import { Button, Card, Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            products: []
        }

        this.ProductService = new ProductService();

        this.ProductService.GetProductMotherDetail(this.state.id)
        .then(data => {
            console.log(data);
            this.setState({
                products: data
            })
        })
        
    }

    render() {
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
    }
}

export default Product;