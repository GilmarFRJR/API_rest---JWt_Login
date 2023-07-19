const mongoose = require('mongoose')
const Item = require('../modelos/Item')


const controladorItens = {

    buscarItens: async (req,res) => {

        const email = req.params.email

        try{
    
            await mongoose.connect('mongodb://127.0.0.1:27017/InfoItems', { useNewUrlParser: true, useUnifiedTopology: true })
            let itens = await Item.find({ email })
            res.send(itens)
    
        } catch (err){
            res.send("Houve o erro     " + err)
        }
    
    },


adicionarItem: async (req,res) => {
 
    const item = new Item(req.body)

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/InfoItems', { useNewUrlParser: true, useUnifiedTopology: true })
        await item.save()
        res.end()
    } catch (err){
        res.send("Houve o erro     " + err)
    }

},

   
editarItem: async (req,res) => {

    let id = req.params.id

    let novoItem = {

        titulo: req.body.titulo,
        descricao: req.body.descricao,
        url: req.body.url

    }
    

    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/InfoItems', { useNewUrlParser: true, useUnifiedTopology: true })
        await Item.findByIdAndUpdate(id, novoItem)
        res.end()

    } catch (err){
        res.send("Houve o erro     " + err)
    }

},


deletarItem: async (req,res) => {

    let id = req.params.id

    try{

         await mongoose.connect('mongodb://127.0.0.1:27017/InfoItems', { useNewUrlParser: true, useUnifiedTopology: true })
        await Item.findByIdAndDelete(id)

        res.end()

    } catch (err){
        res.send("Houve o erro     " + err)
    }

},


deletarTodosOsItens: async (req,res) => {

    const email = req.params.email

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/InfoItems', { useNewUrlParser: true, useUnifiedTopology: true })
        await Item.deleteMany({ email })
        res.end()

    }catch (err){
        res.send("Houve o erro     " + err)
    }

}


}





module.exports = controladorItens