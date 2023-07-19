const express = require('express')
const rota = express.Router()
const controladorItens = require('../controladores/controladorItens')



rota.get('/:email', controladorItens.buscarItens)



rota.post('/', express.json(), controladorItens.adicionarItem)
rota.post('/editar/:id', express.json(), controladorItens.editarItem)


rota.delete('/:email', controladorItens.deletarTodosOsItens)
rota.delete('/:id', controladorItens.deletarItem)

 module.exports = rota