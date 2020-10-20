import React, { Component } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Account from './pages/Account';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import ClientUpdate from './pages/ClientUpdate.jsx';
import ClientPasswordUpdate from './pages/ClientPassWordUpdate';
import AdminPage from './pages/AdminPage';
import CreateMotherProduct from './pages/CreateMotherProduct'
import Panier from './pages/Panier'
import ProduitUpdate from './pages/ProduitUpdate';
import MotherProduitUpdate from './pages/MotherProductUpdate';
import CreateProduct from './pages/CreateProduct';
import CreateProductClient from './pages/CreateProduitClient';
import MCDjson from './pages/MCDjson';
import My404Component from './pages/My404Component';
import My418Component from './pages/My418Component';
import Search from './pages/Search';
import InvoiceClient from './pages/InvoiceClient';
import ProduitClientAVendre from './pages/ProduitClientAVendre';

export class Routes extends Component {
    render() {
        return (
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/shopCart' component={Panier}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/account" component={Account}/>
                    <Route exact path='/signup' component={SignUp}/>
                    <Route exact path='/product/:id' component={Product}/>
                    <Route exact path='/productDetail/:id' component={ProductDetail}/>
                    <Route exact path='/ClientUpdate/:id' component={ClientUpdate}/>
                    <Route exact path='/ClientPasswordUpdate/:id' component={ClientPasswordUpdate}/>
                    <Route exact path='/AdminPage' component={AdminPage}/>
                    <Route exact path='/createMotherProduit' component={CreateMotherProduct}/>
                    <Route exact path='/createProduit' component={CreateProduct}/>
                    <Route exact path='/createProduitClient' component={CreateProductClient}/>
                    <Route exact path='/produitUpdate/:id' component={ProduitUpdate}/>
                    <Route exact path='/motherProduitUpdate/:id' component={MotherProduitUpdate}/>
                    <Route exact path='/Search/:name' component={Search}/>
                    <Route exact path='/invoice/:id' component={InvoiceClient}/>
                    <Route exact path='/voirProduitClient/:id' component={ProduitClientAVendre}/>
                    

                    {/* CMD */}
                    <Route exact path='/model' component={MCDjson}/>

                    {/* 404 | 418*/}
                    <Route exact path='/faitMoiUnCafe' component={My418Component}/>
                    <Route exact={true} component={My404Component} />
                    <Redirect to="/404"/>
                </Switch>
            )
    }
}

export default withRouter(Routes);
