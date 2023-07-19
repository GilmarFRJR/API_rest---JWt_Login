const fetchUSER = {

    cadastro: async (event) => {

        const formData = new FormData(event.target)
        const dados = Object.fromEntries(formData.entries())

        if (dados.senha1 !== dados.senha2) return "erroSenha"

        delete dados.senha1

     

       const res = await fetch('http://localhost:3001/usuario/cadastro', {
                         method: 'POST',
                         headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dados)
                        })

        if (!res.ok) return "erroEmail"

        localStorage.setItem("email", dados.email)

    },


    login: async (event) => {

        const formData = new FormData(event.target)
        const dados = Object.fromEntries(formData.entries())


       const res = await fetch('http://localhost:3001/usuario/login', {
                         method: 'POST',
                         headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dados)
                        })

        if (!res.ok) return "erroDados"


        const data = await res.json()
        const token = data.token
        console.log(token)

        localStorage.setItem("token", token)
        localStorage.setItem("email", dados.email)

    },


    checarToken: async () => {

        const token = localStorage.getItem("token")

        const res = await fetch('http://localhost:3001/usuario', { headers: { "token" : token } })

        return res

    },


    deletarConta: async (email) => {

        await fetch(`http://localhost:3001/usuario/${email}`, {method: 'DELETE'})

    }

}


export default fetchUSER