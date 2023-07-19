const express = require('express')
const rota = express.Router()
const controleDeUsuario = require('../controle/controleDeUsuario')
const controleDeAutenticacao = require('../controle/controleDeAutenticacao')



rota.get('/', controleDeAutenticacao.checarToken)



rota.post('/cadastro', express.json(), controleDeUsuario.cadastro)
rota.post('/login', express.json(), controleDeUsuario.login)

rota.delete('/:email', controleDeUsuario.deletarConta)


module.exports = rota