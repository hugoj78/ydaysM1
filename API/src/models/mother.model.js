const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotherProductSchema = new Schema (
    {
        name: {
            type: String
        },
        path: {
            type: String
        },
        type: {
            type: String
        },
        products: {
            type: [String]
        }
    }
);

module.exports = mongoose.model('MotherProduct', MotherProductSchema);