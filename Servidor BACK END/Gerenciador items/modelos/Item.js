const mongoose = require('mongoose')


const itemSchema = new mongoose.Schema({

    titulo: {type: String},
    descricao: {type: String},
    url: {type: String},
    email: {type: String}

})

module.exports = mongoose.model('InfoItems', itemSchema)