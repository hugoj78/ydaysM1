import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import ProduitSerivce from '../services/product.service';
import InvoiceService from '../services/invoices.service';
import {Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class InvoiceClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            factures: [],
            produits: []
        }

        this.Auth = new AuthService();
        this.Product = new ProduitSerivce();
        this.Facture = new InvoiceService();


       

        this.Facture.ReadInvoiceOfClient(this.state.id)
        .then(data =>{
            this.setState({
                factures: data
            })
        })

        this.Product.ReadProduct()
        .then(data => {
            this.setState({
                produits: data
            })
        });

    }

    getName(id) {
        for (let index = 0; index < this.state.produits.length; index++) {
            const element = this.state.produits[index]._id;
            if (id === element) {
                return this.state.produits[index].name;
            }
        }
    }
    


    render() {
        const facture = this.state.factures.map((data, key) => (
            <tr key={key}>
                <td>{data.pay_date}</td>
                <td>{data.paid.toString()}</td>
                <td>{data.price}</td>
                <td>{data.products.map((array, key) => <div key={key}> name : {this.getName(array._id)} | quantité : {array.qty} | prix : {array.price}</div>)}</td>
            </tr>
        ));
            return (
                <div>
                    <h1>Facture</h1>
                    <br/>

                    <Table striped hover responsive variant="">
                    <thead>
                        <tr>
                        <th>Date de paiement</th>
                        <th>Payé</th>
                        <th>Prix Total</th>
                        <th>Produits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facture}
                    </tbody>
                    </Table>

                    <Link to={"/account"}><Button className="btn btn-info">Retour</Button></Link>
                    <br/>
                    <br/>
                    <br/>
                </div>
            );
    }
}

export default InvoiceClient;