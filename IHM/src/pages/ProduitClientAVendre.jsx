
import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import ProduitSerivce from '../services/product.service';
import {Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class InvoiceClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            products: []
        }

        this.Auth = new AuthService();
        this.Product = new ProduitSerivce();
       

        this.Product.GetProductDetailOfSeller(this.state.id)
        .then(data =>{
            this.setState({
                products: data
            })
        })

    }

    render() {
        const product = this.state.products.map((data, key) => (
            <tr key={key}>
                <td>{data.name}</td>
                <td>{data.price} €</td>
                <td>{data.stock}</td>
            </tr>
        ));
            return (
                <div>
                    <h1>Produit</h1>
                    <br/>

                    <Table striped hover responsive variant="">
                    <thead>
                        <tr>
                        <th>nom</th>
                        <th>prix</th>
                        <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product}
                    </tbody>
                    </Table>

                    <Link to={"/account"}><Button className="btn btn-info" style={{marginRight: 20 + 'px' }}>Retour</Button></Link>
                    <br/>
                    <br/>
                    <br/>
                </div>
            );
    }
}

export default InvoiceClient;