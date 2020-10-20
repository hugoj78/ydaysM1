import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import ClientService from '../services/client.service';
import ProduitSerivce from '../services/product.service';
import MotherProduitSerivce from '../services/motherProduct.service';
import InvoiceService from '../services/invoices.service';
import {Table, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            admin: false,
            motherProducts: [],
            products: [],
            clients: [],
            factures: []
        }

        this.Auth = new AuthService();
        this.MotherProduct = new MotherProduitSerivce();
        this.Produit = new ProduitSerivce();
        this.Client = new ClientService();
        this.Facture = new InvoiceService();

        const profil = this.Auth.getUserProfil();
        this.state.admin = profil.admin;

        this.MotherProduct.ReadProduct()
            .then(data => {
                //console.log(data);
                this.setState({
                    motherProducts: data
                })
            })

        this.Produit.ReadProduct()
        .then(data => {
            //console.log(data);
            this.setState({
                products: data
            })
        })

        this.Client.ReadClient()
        .then(data => {
            //console.log(data);
            this.setState({
                clients: data
            })
        })

        this.Facture.ReadInvoice()
        .then(data =>{
            //console.log(data);
            this.setState({
                factures: data
            })
        })

    }

    NoAdmin() {
        window.location = "/"
    }

    CreateClient() {
        window.location = "/signUp"
    }

    CreateProduit() {
        window.location = "/createProduit"
    }

    CreateMotherProduit() {
        window.location = "/createMotherProduit"
    }

    CreateFacture() {
        window.location = "/createInvoice"
    }

    DeleteClient(id) {
        this.Client.DeleteClient(id);
        window.location.reload();
    }

    DeleteInvoice(id) {
        this.Facture.DeleteInvoice(id);
        window.location.reload();
    }

    DeleteMotherProduit(id) {
        this.MotherProduct.DeleteProduct(id);
        window.location.reload();
    }

    DeleteProduit(id) {
        this.Produit.DeleteProduct(id);
        window.location.reload();
    }

    getName(id) {
        for (let index = 0; index < this.state.products.length; index++) {
            const element = this.state.products[index]._id;
            if (id === element) {
                return this.state.products[index].name;
            }
        }
    }


    render() {
        if (this.state.admin) {
            const motherProduct = this.state.motherProducts.map((data, key) => (
                <tr key={key}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{data.type}</td>
                    <td>{data.products.length}</td>
                    <td><Link to={"/motherProduitUpdate/" + data._id}><Button className="btn btn-warning">Modifier</Button></Link></td>
                    <td><Button className="btn  btn-danger" onClick={(e) => this.DeleteMotherProduit(data._id)}> Supprimer </Button></td>
                </tr>
            ));

            const product = this.state.products.map((data, key) => (
                <tr key={key}>
                    <td>{data._id}</td>
                    <td>{data.name}</td>
                    <td>{data.idmotherproduct}</td>
                    <td>{data.idvendeur}</td>
                    <td>{data.price} €</td>
                    <td>{data.stock}</td>
                    <td>{data.invoices.length}</td>
                    <td><Link to={"/produitUpdate/" + data._id}><Button className="btn btn-warning">Modifier</Button></Link></td>
                    <td><Button className="btn  btn-danger" onClick={(e) => this.DeleteProduit(data._id)}> Supprimer </Button></td>
                </tr>
            ));

            const client = this.state.clients.map((data, key) => (
                <tr key={key}>
                    <td>{data._id}</td>
                    <td>{data.email}</td>
                    <td>{data.lastname}</td>
                    <td>{data.firstname}</td>
                    <td>{data.admin.toString()}</td>
                    <td><Link to={"/clientUpdate/" + data._id}><Button className="btn btn-warning">Modifier</Button></Link></td>
                    <td><Button className="btn  btn-danger" onClick={(e) => this.DeleteClient(data._id)}> Supprimer </Button></td>
                </tr>
            ));
            
            const facture = this.state.factures.map((data, key) => (
                <tr key={key}>
                    <td>{data._id}</td>
                    <td>{data.client}</td>
                    <td>{data.pay_date}</td>
                    <td>{data.paid.toString()}</td>
                    <td>{data.price} €</td>
                    <td>{data.products.map(array => <div> id :{array._id} | name : {this.getName(array._id)} | quantité : {array.qty} | prix : {array.price} €</div>)}</td>
                    <td><Link to={"/invoiceUpdate/" + data._id}><Button className="btn btn-warning" disabled>Modifier</Button></Link></td>
                    <td><Button className="btn  btn-danger" disabled> Supprimer </Button></td>
                </tr>
            ));

            return (
                <div>
                    <h1>MAMAN PRODUIT</h1>
                    <br/>
                    <Table striped hover responsive variant="">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>type</th>
                        <th>Nbre de Vendeur</th>
                        <th>Modification</th>
                        <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {motherProduct}
                    </tbody>
                    </Table>

                    <Button onClick={this.CreateMotherProduit} className="btn  btn-success" type="submit">Créer Maman Produit</Button>

                    <br/>
                    <br/>
                    <br/>

                    <hr/>
                    
                    <br/>
                    
                    <h1>PRODUIT</h1>
                    <br/>

                    <Table striped hover responsive variant="">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>id Maman Produit</th>
                        <th>id Vendeur</th>
                        <th>prix</th>
                        <th>Stock</th>
                        <th>Facture</th>
                        <th>Modification</th>
                        <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product}
                    </tbody>
                    </Table>

                    <Button onClick={this.CreateProduit} className="btn  btn-success" type="submit">Créer Produit</Button>

                    <br/>
                    <br/>
                    <br/>

                    <hr/>
                    
                    <br/>
                    
                    <h1>CLIENT</h1>
                    <br/>

                    <Table striped hover responsive variant="">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>Email</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Admin</th>
                        <th>Modification</th>
                        <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {client}
                    </tbody>
                    </Table>

                    <Button onClick={this.CreateClient} className="btn  btn-success" type="submit">Créer Client</Button>

                    <br/>
                    <br/>
                    <br/>
                    <hr/>
                    
                    <br/>
                    
                    <h1>Facture</h1>
                    <br/>

                    <Table striped hover responsive variant="">
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>Client</th>
                        <th>Date de paiement</th>
                        <th>Payé</th>
                        <th>Prix</th>
                        <th>Produits</th>
                        <th>Modification</th>
                        <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facture}
                    </tbody>
                    </Table>
                    <p>La création, modification et la suppression de facture existe dans le back API mais n'est pas utiliser dans le front pour respecter une cohérence.</p>

                    <Button disabled onClick={this.CreateFacture} className="btn  btn-success" type="submit">Créer Facture</Button>

                    <br/>
                    <br/>
                    <br/>
                </div>
            );
        } else {
            return (
                <div>
                    <p>You don't have the rights</p>
                    {this.NoAdmin()}
                </div>
            );
        }
    }
}

export default AdminPage;