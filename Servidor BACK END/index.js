const express = require('express')
const cors = require('cors')

const rotaUsuario = require('./Gerenciador Úsuarios/rotas/rotasDeUsuario')
const rotasEditItens = require('./Gerenciador items/rotas/rotasEdit')

const app = express()


app.listen(3001, ()=> {console.log("Servidor rodando!")})

app.use(cors({
  origin: 'http://localhost:3000' 
})) 



app.use('/usuario', rotaUsuario)
app.use('/editItems', rotasEditItens)