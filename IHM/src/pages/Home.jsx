import React, { Component } from 'react';
//import ProductService from '../services/product.service';
import MotherProductService from '../services/motherProduct.service';
import { Button, Card, Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Fnook',
            subtitle: 'Bienvenue sur Fnook',
            text: 'Liste des produits',
            products: []
        }

        this.MotherProductService = new MotherProductService();

        this.MotherProductService.ReadProduct()
            .then(data => {
                this.setState({
                    products: data
                })
            })
    }

    render() {
        
            const prod = this.state.products.map((data, key) => (
                <Col key={key}>
                    <Card style={{ width: 20 + 'em' ,margin: 0 + ' auto', float: "none", marginBottom: 3 + 'em'}}>
                    <Card.Img variant="top" src={data.path} width="300" height="250"/>
                    <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        Description : {data.type}
                    </Card.Text>
                    <Link to={"/product/" + data._id}><Button className="btn btn-info">Voir les différentes offres</Button></Link>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Vendeur disponible : {data.products.length}</small>
                    </Card.Footer>
                    </Card>
                </Col>
            ));
            return (
                <div>

                    <Container fluid style={{backgroundColor: `#83caa3` }}>
                        <Row>
                            {prod}
                        </Row>
                    </Container>
            </div>
        );
    }
}

export default Home;