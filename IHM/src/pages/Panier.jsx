import React, { Component } from 'react';
import PanierService from '../services/panier.service';
import InvoiceService from '../services/invoices.service';
import Auth from '../services/auth.service'
import { Button, Container, Row, Col, Table, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export class Panier extends Component {

    constructor(props) {
        super(props);

        this.PanierService = new PanierService();
        this.InvoiceService = new InvoiceService();
        this.Auth = new Auth();
        this.handleChangeStock = this.handleChangeStock.bind(this);

        this.state = {
            products: [],
            numberTemp: [],
            qty : this.PanierService.getQuantityProductOnPanier(),
            prdts : this.PanierService.getProductsOnPanier()
        }

    }

    componentDidMount() { 
        this.adrienNommeCetteFonction(this.state.qty, this.state.prdts); 
    }



    async adrienNommeCetteFonction(quantity, products) {
        if(products != null) {
            for (let index = 0; index < products.length; index++) {

                await this.PanierService.GetProductDetail(products[index])
                .then(data => {
                    console.log(data);
                    this.state.products.push(data)
    
                    this.setState({
                        products: this.state.products
                    })
                })
    
                var value = parseInt(quantity[index])
                this.state.numberTemp.push(value)
                this.setState({
                    numberTemp: this.state.numberTemp
                })
                
            }
        }
    }


    handleChangeStock(key, event) {
        // eslint-disable-next-line
        this.state.numberTemp[key] = event.target.value

        this.PanierService.updateQuantity(key,event.target.value);
        this.setState({
          numberTemp: this.state.numberTemp
        });
      }

    deletePanier(index){
        
    	this.PanierService.deleteindexPanier(index);
    	window.location.reload();
    }

    createInvoice(price, event) {
        var products = [];
        for(var i in this.state.prdts){
            if (this.state.numberTemp[i] > this.state.products[i].stock) {
                // eslint-disable-next-line
                this.state.numberTemp[i] = this.state.products[i].stock;
            }
            var product = {"_id":this.state.prdts[i], "qty":this.state.numberTemp[i], "price":this.state.numberTemp[i]*this.state.products[i].price}
            products.push(product);
        }
        var body = {"paid":true,"products":products, "price": price}
        this.InvoiceService.CreateInvoice(body);
        this.PanierService.deleteALL();
        window.location.reload();

    }
    
    render() {
        
        if(this.Auth.getToken() === null && this.state.products.length !== 0) {
            const prod = this.state.products.map((data, key) => (
                
                <tr key={key} >
                    <td><Link to={"/productDetail/" + data._id}><img width={50} height={50} className="mr-3" src={data.path} alt="Img product" /></Link> </td>
                    <td>{data.name}</td>
                    <td>{data.price*this.state.numberTemp[key] || data.price} €</td>
                    <td><Form.Control type="number" step={1} min={1} max={data.stock} name="qty" value={this.state.numberTemp[key]} onChange={(e) => this.handleChangeStock(key, e)}/></td>
                    <td><Button className="btn btn-sm btn-danger" onClick={(e) => this.deletePanier(key)}>X</Button></td>
                </tr>
               
            ));
            const priceTotal = this.state.products.reduce((priceTotal, product, index) => priceTotal + product.price*this.state.numberTemp[index], 0) || this.state.products.reduce((priceTotal, product, index) => priceTotal + product.price, 0);
                return (
                    <Container>
                        <Row>
                        <br/>
                            <h1>Panier</h1>
                            <br/><br/><br/>
                                <Table striped hover responsive variant="" style={{backgroundImage: `url(/img/nook2.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {prod}
                                    </tbody>
                                </Table>
                                <Col sm={{span: 2, offset: 10}}>
                                    <p>Total : {priceTotal} €</p>
                                </Col>
                            <Col sm={6}>
                                <Link to={"/"}><Button className="btn  btn-success">Continue Shopping</Button></Link> 
                            </Col>
                            <Col sm={{ span: 1, offset: 2 }}>
                                <Button className="btn  btn-success" onClick={(e) => this.createInvoice(priceTotal)} disabled>Checkout</Button>
                            </Col>
                            <br/><br/><br/><br/>
                            <br/><br/><br/><br/>
                            <Col sm={12}>
                                <img
                                alt="teapot"
                                src="/img/logoo.png"
                                width="300"
                                height="150"
                                className="d-inline-block align-center"/>
                                <br/><br/><br/><br/>
                                <p>Votre panier est là pour vous servir. Donnez-lui un but : remplissez-le de Pommes, de Pêche, de Switch, de Lit, d'équipements électroniques et plus encore.</p>
                                <br/>
                                <p>Le prix et la disponibilité des articles sur Fnook sont sujets à changement. Le panier est un lieu temporaire où est stockée une liste de vos articles et où se reflète le prix le plus récent de chaque article.</p>
                            </Col>
                            
                        </Row>
                    </Container>
                );
        } else if (this.state.products.length === 0){
                const prod = this.state.products.map((data, key) => (
                    
                    <tr key={key} >
                        <td><Link to={"/productDetail/" + data._id}><img width={50} height={50} className="mr-3" src={data.path} alt="Img product" /></Link> </td>
                        <td>{data.name}</td>
                        <td>{data.price*this.state.numberTemp[key] || data.price} €</td>
                        <td><Form.Control type="number" step={1} min={1} max={data.stock} name="qty" value={this.state.numberTemp[key]} onChange={(e) => this.handleChangeStock(key, e)}/></td>
                        <td><Button className="btn btn-sm btn-danger" onClick={(e) => this.deletePanier(key)}>X</Button></td>
                    </tr>
                   
                ));
                const priceTotal = this.state.products.reduce((priceTotal, product, index) => priceTotal + product.price*this.state.numberTemp[index], 0) || this.state.products.reduce((priceTotal, product, index) => priceTotal + product.price, 0);
                    return (
                        <Container>
                            <Row>
                            <br/>
                            <h1>Panier</h1>
                            <br/><br/><br/>
                                    <Table striped hover responsive variant="">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th></th>
                                            </tr>
                                        </thead>
    
                                        <tbody>
                                            {prod}
                                        </tbody>
                                    </Table>
                                    <Col sm={{span: 2, offset: 10}}>
                                        <p>Total : {priceTotal} €</p>
                                    </Col>
                                <Col sm={6}>
                                    <Link to={"/"}><Button className="btn  btn-success">Continue Shopping</Button></Link> 
                                </Col>
                                <Col sm={{ span: 1, offset: 2 }}>
                                    <Button className="btn  btn-success" onClick={(e) => this.createInvoice(priceTotal)} disabled>Checkout</Button>
                                </Col>
                            <br/><br/><br/><br/>
                            <Col sm={12}>
                                <img
                                alt="teapot"
                                src="/img/logoo.png"
                                width="300"
                                height="150"
                                className="d-inline-block align-center"/>
                                <br/><br/><br/><br/>
                                <p>Votre panier est là pour vous servir. Donnez-lui un but : remplissez-le de Pommes, de Pêche, de Switch, de Lit, d'équipements électroniques et plus encore.</p>
                                <br/>
                                <p>Le prix et la disponibilité des articles sur Fnook sont sujets à changement. Le panier est un lieu temporaire où est stockée une liste de vos articles et où se reflète le prix le plus récent de chaque article.</p>
                            </Col>
                                
                            </Row>
                        </Container>
                    );
        } else {
            const prod = this.state.products.map((data, key) => (
                
                <tr key={key} >
                    <td><Link to={"/productDetail/" + data._id}><img width={50} height={50} className="mr-3" src={data.path} alt="Img product" /></Link> </td>
                    <td>{data.name}</td>
                    <td>{data.price*this.state.numberTemp[key] || data.price} €</td>
                    <td><Form.Control type="number" step={1} min={1} max={data.stock} name="qty" value={this.state.numberTemp[key]} onChange={(e) => this.handleChangeStock(key, e)}/></td>
                    <td><Button className="btn btn-sm btn-danger" onClick={(e) => this.deletePanier(key)}>X</Button></td>
                </tr>
               
            ));
            const priceTotal = this.state.products.reduce((priceTotal, product, index) => priceTotal + product.price*this.state.numberTemp[index], 0) || this.state.products.reduce((priceTotal, product, index) => priceTotal + product.price, 0);
                return (
                    <Container>
                        <Row>
                            <br/>
                            <h1>Panier</h1>
                            <br/><br/><br/>
                                <Table striped hover responsive variant="" style={{backgroundImage: `url(/img/nook2.png)`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {prod}
                                    </tbody>
                                </Table>
                                <Col sm={{span: 2, offset: 10}}>
                                    <p>Total : {priceTotal} €</p>
                                </Col>
                            <Col sm={6}>
                                <Link to={"/"}><Button className="btn  btn-success">Continue Shopping</Button></Link> 
                            </Col>
                            <Col sm={{ span: 1, offset: 2 }}>
                                <Button className="btn  btn-success" onClick={(e) => this.createInvoice(priceTotal)}>Checkout</Button>
                            </Col >
                            <br/><br/><br/><br/>
                            <Col sm={12}>
                                <img
                                alt="teapot"
                                src="/img/logoo.png"
                                width="300"
                                height="150"
                                className="d-inline-block align-center"/>
                                <br/><br/><br/><br/>
                                <p>Votre panier est là pour vous servir. Donnez-lui un but : remplissez-le de Pommes, de Pêche, de Switch, de Lit, d'équipements électroniques et plus encore.</p>
                                <br/>
                                <p>Le prix et la disponibilité des articles sur Fnook sont sujets à changement. Le panier est un lieu temporaire où est stockée une liste de vos articles et où se reflète le prix le plus récent de chaque article.</p>
                            </Col>
                        </Row>
                    </Container>
            );
        }
    }
}

export default Panier;