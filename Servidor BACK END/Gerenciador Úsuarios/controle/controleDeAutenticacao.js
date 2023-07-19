const jwt = require('jsonwebtoken')
require('dotenv').config()



const controleDeAutenticacao = {

   checarToken: async (req,res) => {

        const token = req.header('token')

        if (!token) return res.status(401).end()

        try{

        jwt.verify(token, 'process.env.secretToken')
        res.end()

   } catch (err) {

        res.status(401).end()

   }
    
    }

}


module.exports = controleDeAutenticacao