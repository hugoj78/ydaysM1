const mongoose = require('mongoose');
const Product = require('../models/product.model');
const MotherProduct = require('../models/mother.model');
const ClientProduct = require('../models/client.model');
const bcrypt = require('bcrypt');
const fs = require('fs');

function addProductToMother( idmotherproduct, idproduct){
    MotherProduct.findById(_id=idmotherproduct).then(motherproduct => {

        motherproduct.products.push(idproduct);
        MotherProduct.findByIdAndUpdate( {_id:motherproduct._id}, {products:motherproduct.products})
            .then(product =>{
                // res.send(data);
            })
            .catch(err =>{
                console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })   
}


function addProductToClient(idclient, idproduct){

    ClientProduct.findById(_id=idclient).then(client=>{
        client.products.push(idproduct);
        ClientProduct.findByIdAndUpdate({_id:client._id}, {products:client.products})
        .then(clients=>{

        })
        .catch(err =>{
                console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })  
}


function removeProductToClient( idclient, idproduct){
    ClientProduct.findById(_id=idclient).then(client => {
        for(var product in client.products){

            if(idproduct == client.products[product]){
                delete client.products[product]
                break
            }
        }
        client.products = client.products.filter(function (el) {
            return el != null;
        });
        //products.invoices.push(idinvoice);

        ClientProduct.findByIdAndUpdate( {_id:client._id}, {products:client.products})
            .then(client =>{
                // res.send(data);
            })
            .catch(err =>{
                res.status(500).send({
                    message:err.message || "Some error occured when finding manager."
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred when finding products."
        })
    }) 
}

function removeProductToMotherProduct( idmotherproduct, idproduct){
    MotherProduct.findById(_id=idmotherproduct).then(motherproduct => {
        for(var product in motherproduct.products){

            if(idproduct == motherproduct.products[product]){
                delete motherproduct.products[product]
                break
            }
        }
        motherproduct.products = motherproduct.products.filter(function (el) {
            return el != null;
        });
        //products.invoices.push(idinvoice);

        MotherProduct.findByIdAndUpdate( {_id:motherproduct._id}, {products:motherproduct.products})
            .then(product =>{
                // res.send(data);
            })
            .catch(err =>{
                res.status(500).send({
                    message:err.message || "Some error occured when finding manager."
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred when finding products."
        })
    }) 
}

exports.create = (req, res) => {
    if(!res._headerSent) {
        //res.send(req.userId);

        const startDate = Date.now();
        const productCreate = new Product(
            {
                stock: req.body.stock,
                price: req.body.price,
                create_date: startDate,
                idmotherproduct: req.body.idmotherproduct,
                idvendeur: req.userId      
            });
        //res.send(productCreate)
        
            productCreate.save()
            .then(data => {
                MotherProduct.findById(_id = req.body.idmotherproduct)
                    .then(motherproducts => {
                        productCreate.name = motherproducts.name;
                        productCreate.path =  motherproducts.path;
                        req.body.path =  motherproducts.path;
                        req.body.name = motherproducts.name;
                        req.params.id = productCreate._id;
                        this.updatePath(req, res);
                        addProductToMother(req.body.idmotherproduct, productCreate._id);
                        addProductToClient(req.userId, productCreate._id);
                        res.send(data);

                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred when finding motherproducts."
                        })
                    })
            })
            .catch(err => {
                res.status(500).send(
                    {
                        message: err.message,
                    }
                )
            });
            
    }
};

// get all products
exports.findAll = (req, res) => {
    if(!res.headersSent) {
        Product.find()
            .then(products => {
                res.send(products);
            })
            .catch(err => {
                console.log("res", res);
                res.status(500).send({
                    message: err.message || "Some error occurred when finding products."
                });
            })
    }
};

// Get product by Id
exports.findById = (req, res) => {
    if(!res.headersSent) {
        Product.findById(_id = req.params.id)
            .then(product => {
                res.send(product);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding products."
                })
            })
    }
};

// Get product by Id Mother
exports.findByIdMother = (req, res) => {
    if(!res.headersSent) {
        Product.find({'idmotherproduct' : req.params.id})
            .then(product => {
                res.send(product);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding products."
                })
            })
    }
};

// Update product by Id
exports.updateById = (req, res) => {
    console.log(res._headerSent)
    if(!res._headerSent) {
        Product.findById(req.params.id)
            .then(products => {
    
           if((products.idvendeur == req.userId) || (req.admin==true)){
            Product.findByIdAndUpdate(req.params.id, req.body)
                .then(products => {
                    res.send(products);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred when finding and updating product."
                    })
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "No acces forbideen."
            })
        })
    }
};

// Update product by Id
exports.updatePath = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then(products => {
            //res.send(products);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred when finding and updating product."
            })
        })
};

// Delete product by Id
exports.deleteByID = (req, res) => {
    if(!res.headersSent) {
        Product.findById(req.params.id)
            .then(products => {
           
               if(products.idvendeur == req.userId){
                removeProductToClient(req.userId, req.params.id)
                removeProductToMotherProduct(products.idmotherproduct, req.params.id)
                Product.findByIdAndDelete(req.params.id)
                .then(products => {
                    res.send("Product Delete");
                   

                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred when finding and deleting product."
                    })
                })

            }
            else{
                res.status(400).send({
                    auth: false,
                    message: 'Invalid User'
                })
            }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding and updating product."
                })
            })

        }
};

// Delete All products
exports.deleteAllproducts = (req, res) => {
    if(!res.headersSent) {
        Product.remove()
            .then(products => {
                res.send(products);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding and deleting all products."
                })
            })
    }
};


exports.findByName = (req, res) => {
    if(!res.headersSent) {
        Product.find({'name' :{ $regex: new RegExp(req.params.name, "i") }})
            .then(product => {
                res.send(product);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding products."
                })
            })
    }
};

exports.getproductsofseller = (req, res) => {
    if(!res.headersSent) {
        Product.find({'idvendeur' :{ $regex: req.params.id }})
            .then(product => {
                res.send(product);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding products."
                })
            })
    }
};