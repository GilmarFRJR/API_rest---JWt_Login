const Usuario = require('../modelos/Usuario')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()



const controleDeUsuario = {

    cadastro: async (req,res) => {

        await mongoose.connect('mongodb://127.0.0.1:27017/Usuario', { useNewUrlParser: true, useUnifiedTopology: true })

        const dadosUsuario = await Usuario.findOne({ email: req.body.email })
        if (dadosUsuario) return res.status(400).end()


        const usuario = new Usuario({

            nome: req.body.nome,
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha2)

        })
            
         await usuario.save()
         res.end()

    },

    login: async (req,res) => {

        await mongoose.connect('mongodb://127.0.0.1:27017/Usuario', { useNewUrlParser: true, useUnifiedTopology: true })

        const dadosUsuario = await Usuario.findOne({ email: req.body.email })
        if (!dadosUsuario) return res.status(400).end()


        const checarSenhaEusuario = bcrypt.compareSync(req.body.senha, dadosUsuario.senha)
        if (!checarSenhaEusuario) return res.status(400).end()

        const token = jwt.sign({ id: dadosUsuario._id }, 'process.env.secretToken')
        
        res.send({ token: token })

    },


    deletarConta: async (req,res) => {

        const email = req.params.email

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/Usuario', { useNewUrlParser: true, useUnifiedTopology: true })
        await Usuario.deleteMany({ email })
        res.end()

    }catch (err){
        res.send("Houve o erro     " + err)
    }

    }

}


module.exports = controleDeUsuario