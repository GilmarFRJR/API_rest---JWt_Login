const mongoose = require('mongoose')


const UsuarioSchema = mongoose.Schema({

    nome: {type: String, required: true, minlength: 3, maxlength: 50},
    email: {type: String, required: true, minlength: 3, maxlength: 50},
    senha: {type: String, required: true, minlength: 8},
    dataDeCriacao: {type: Date, default: Date.now},

})


module.exports = mongoose.model('Usuario', UsuarioSchema)