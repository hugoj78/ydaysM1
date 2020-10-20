const mongoose = require('mongoose');
const Product = require('../models/product.model');
const MotherProduct = require('../models/mother.model')
const bcrypt = require('bcrypt');
const fs = require('fs');


exports.create = (req, res) => {
    if(!res._headerSent) {
        const startDate = Date.now();
        const motherproductCreate = new MotherProduct(
            {
                name: req.body.name,
                path: req.body.path,
                type: req.body.type,
                products: []
            });

        motherproductCreate.save()
        .then(data => {
            var img = motherproductCreate._id + ".png";
            var destination = '../IHM/public/IMG/products/' + img;

            //var path_acces = req.body.path;

            fs.copyFile(req.body.path, destination, (error) =>{
                if(error){

                   console.log(error); 
                }
                });

            req.body.path = "/IMG/products/" + img;
            motherproductCreate.path =  req.body.path;
            req.params.id = motherproductCreate._id ;
            this.updateById(req, res);
            res.send(data);
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
        MotherProduct.find()
            .then(motherproducts => {
                res.send(motherproducts);
            })
            .catch(err => {
                console.log("res", res);
                res.status(500).send({
                    message: err.message || "Some error occurred when finding motherproducts."
                });
            })
    }
};

// Get product by Id
exports.findById = (req, res) => {
    if(!res.headersSent) {
        MotherProduct.findById(_id = req.params.id)
            .then(motherproducts => {
                res.send(motherproducts);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding motherproducts."
                })
            })
    }
};

// Update motherproducts by Id
exports.updateById = (req, res) => {
    if(!res.headersSent) {
        MotherProduct.findByIdAndUpdate(req.params.id, req.body)
            .then(motherproducts => {
                res.send(motherproducts);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding and updating motherproducts."
                })
            })
    }
};

// Delete motherproducts by Id
exports.deleteByID = (req, res) => {
    if(!res.headersSent) {
        MotherProduct.findByIdAndDelete(req.params.id)
            .then(motherproducts => {
                res.send(motherproducts);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding and deleting motherproducts."
                })
            })
    }
};

// Delete All motherproducts
exports.deleteAllproducts = (req, res) => {
    if(!res.headersSent) {
        MotherProduct.remove()
            .then(motherproducts => {
                res.send(motherproducts);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding and deleting all motherproducts."
                })
            })
    }
};