const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema (
    {
        name: {
            type: String
        },
        stock: {
            type: Number
        },
        path: {
            type: String
        },
        price:{
            type: Number
        },
        create_date:{
            type: Date
        },
        invoices: [{ _id: String, qty: Number, price:Number}],
        
        idmotherproduct:{
            type: String
        },
        idvendeur:{
            type: String
        }
    },
);

module.exports = mongoose.model('Product', ProductSchema);