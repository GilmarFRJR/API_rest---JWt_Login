const fetchAPI = {

  buscarItens: () => {

      const email = localStorage.getItem('email')

      return fetch(`http://localhost:3001/editItems/${email}`)
      .then(res => 
        res.json()
      ).catch(err => {
        console.log(err)
      })

  },


  adicionarItem: async (event) => {

      const formData = new FormData(event.target)
      const dados = Object.fromEntries(formData.entries())

      const email = localStorage.getItem('email')

      dados.email = email

      try{

              await fetch('http://localhost:3001/editItems', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(dados)
          })

      } catch (err) {
          console.log(err)
      }

  },


  editarItem: async (id, event) => {

     const formData = new FormData(event.target)
     const dados = Object.fromEntries(formData.entries())

      try{

              await fetch(`http://localhost:3001/editItems/editar/${id}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(dados)
          })

      } catch (err) {
          console.log(err)
      }

  },


  deletarItem: async (id) => {

    await fetch(`http://localhost:3001/editItems/${id}`, {method: 'DELETE'})

  },
  
  
  deletarTodosOsItens: async () => {

    const email = localStorage.getItem('email')

    await fetch(`http://localhost:3001/editItems/${email}`, {method: 'DELETE'})

}


}


export default fetchAPI