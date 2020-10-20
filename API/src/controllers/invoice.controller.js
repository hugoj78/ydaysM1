const Invoice = require('../models/invoice.model');
const Product = require('../models/product.model');
const Client = require('../models/client.model');
const bcrypt = require('bcrypt');



function getInvoiceToProduct(products, id) {
   for (var product of products){
        addInvoiceToProducts(product, id);
    };
}

function addInvoiceToClient(idclient, idinvoice ){

    Client.findById(_id=idclient).then(client=>{
        client.invoices.push(idinvoice);
        Client.findByIdAndUpdate({_id:client._id}, {invoices:client.invoices})
        .then(clients=>{

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

function addInvoiceToProducts(product, idinvoice){
    
   // console.log(product)
    Product.findById(_id=product._id).then(products => {
        invoice = {"_id":idinvoice, "qty":product.qty, "price":product.price};
        //console.log(products);

        products.invoices.push(invoice);
        products.stock = products.stock - product.qty;
      
        Product.findByIdAndUpdate( {_id:products._id}, {invoices:products.invoices, stock:products.stock})
            .then(product =>{
                console.log("UPDATE ")
            })
            .catch(err =>{
                console.log(err)
        }) 
    }).catch(err => {
        console.log(err)
    })  
}


exports.create = (req, res) => {
    if(!res._headerSent) {
        const start = Date.now();

        const invoiceCreate = new Invoice(
            {
                client: req.userId,
                issue_date: start,
                paid: req.body.paid,
                pay_date: start,
                price: req.body.price,
                products:  req.body.products
            }
        );
        invoiceCreate.save()
            .then(data => {
                getInvoiceToProduct(req.body.products, invoiceCreate._id)
                addInvoiceToClient(req.userId, invoiceCreate._id);
                res.send(data)     
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

// get all 
exports.findAll = (req, res) => {
    if(!res._headerSent) {
        Invoice.find()
            .then(invoices => {
                res.send(invoices);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding invoice."
                })
            })
    }
};

// Get User by Id
exports.findById = (req, res) => {
    if(!res._headerSent) {
        Invoice.findById(_id = req.params.id)
            .then(invoice => {
                res.send(invoice);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding invoice."
                })
            })
    }
};



// Update User by Id
exports.updateById = (req, res) => {
    if(!res._headerSent) {
         Invoice.findById(req.params.id)
            .then(invoices => {
    
           if((invoices.client == req.userId) || (req.admin==true)){
            Invoice.findByIdAndUpdate(req.params.id, req.body)
                .then(invoice => {
                    res.send(invoice);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred when finding and updating invoice."
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

// Delete User by Id
exports.deleteByID = (req, res) => {
    if(!res._headerSent) {
        Invoice.findByIdAndDelete(req.params.id)
            .then(invoice => {
                res.send(invoice);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding and deleting invoice."
                })
            })
    }
};

// Delete All User
exports.deleteAllInvoices = (req, res) => {
    if(!res._headerSent) {
        Invoice.remove()
            .then(invoice => {
                res.send(invoice);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding and deleting all invoice."
                })
            })
    }
};

exports.getInvoicesofclient = (req, res) => {
    if(!res.headersSent) {
        Invoice.find({'client' :{ $regex: req.params.id }})
            .then(invoices => {
                res.send(invoices);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred when finding products."
                })
            })
    }
};