import React, { useState, useEffect } from 'react'

import fetchAPI from '../fetch/fetchAPI'
import fetchUSER from '../fetch/fetchUSER'

import '../style/ProdutosPage.css'



function ProdutosPage(){

    const [itens, setItens] = useState([])

    const [aparecer, setAparecer] = useState(false)

    const [mostrarTelaCriarCartao, setMostrarTelaCriarCartao] = useState(true)
    const [mostrarTelaEditarCartao, setMostrarTelaEditarCartao] = useState(true)
    const [idItem, setIdItem] = useState('')
    const [valorOriginal, setValorOriginal] = useState([])


    useEffect(() => {

        setAparecer(true)
        
        setTimeout(() => {
            setAparecer(false)
        }, 300)

    }, [])


    function MostrarTelaCriarCartao(){

        setMostrarTelaCriarCartao(false)

    }

    function esconderTelaCriarCartao(){

        setMostrarTelaCriarCartao(true)

    }


    function MostrarTelaEditarCartao(id, titulo, descricao, url){

        setIdItem(id)
        setValorOriginal([titulo, descricao, url])
        setMostrarTelaEditarCartao(false)

    }

    function esconderTelaEditarCartao(){

        setMostrarTelaEditarCartao(true)

    }


    useEffect(() => {

        fetchAPI.buscarItens()
        .then((itens) => {setItens(itens)})

    }, [])



    function enviarItem(event){

        event.preventDefault()

        fetchAPI.adicionarItem(event)
        .then(() => {
  
          fetchAPI.buscarItens()
          .then((itens) => {
  
              setItens(itens)
  
          })
  
        })
  
        esconderTelaCriarCartao()
        event.target.reset()

  }


   function editarItem(event){

      event.preventDefault()

      fetchAPI.editarItem(idItem, event)
      .then(() => {

        fetchAPI.buscarItens()
        .then((itens) => {

            setItens(itens)

        })

      })

      esconderTelaEditarCartao()
      event.target.reset()
    

   }


    function deletarItem(id){

        fetchAPI.deletarItem(id).then(() => {

            fetchAPI.buscarItens()
            .then((itens) => {
    
                setItens(itens)
    
            })})
       

    }


    function deletarTodosOsItens(){

        fetchAPI.deletarTodosOsItens().then(() => {

            fetchAPI.buscarItens()
            .then((itens) => {
    
                setItens(itens)
    
            })})     

  }


  function deletarConta() {
    
       const email = localStorage.getItem("email")

       fetchUSER.deletarConta(email)

       localStorage.clear()
       window.location.reload()

  }



    return(

        <div className={`containerProdutosPage ${aparecer ? 'aparecer' : ''}`}>

            <div className='containerOpcoes'>

               <button onClick={ MostrarTelaCriarCartao }>Criar<br />Cartão</button>

               <button onClick={ deletarTodosOsItens }>Excluir Todos<br />os Cartões</button>

               <button onClick={ () => { window.location.reload() } }>logout</button>

               <button onClick={ deletarConta }>Excluir sua<br />Conta</button>

            </div>


           <div className='containerProdutos'>

              {

                  itens.map((item) => (

                  <div className='produto'>

                    <h2>Nome do Produto:<br />{item.titulo}</h2>
    
                    <p>Descrição:<br /><br />{item.descricao}</p>
    
                    <p>Link: <a href={item.url} target="_blank">{item.url}</a></p>
    
                    <button onClick={ () => {deletarItem(item._id)} }>Excluir</button>
    
                    <button onClick={ () => {MostrarTelaEditarCartao(item._id, item.titulo, item.descricao, item.url)} }>Editar</button>
    
                 </div>

                  ))

              }

           </div>



           <div className='containerTelacartao' style={{ display: mostrarTelaCriarCartao ? 'none' : '' }}>  

               <div>

                <form onSubmit={ enviarItem }>

                   <label for="titulo">Título do Produto:</label>
                   <input type="text" id="titulo" name='titulo' maxLength={30} required  />

                   <label for="descricao">Descrição do Produto:</label>
                   <textarea id='descricao' rows="7" cols="30" name='descricao' maxLength={220} required  />

                   <label for="link">Link para o Produto:</label>
                   <input type="text" id="link" name='url' required  />

                   <button type='submite'>Enviar</button>
                   <button type='submite' onClick={ esconderTelaCriarCartao }>Voltar</button>

                </form>
                
               </div>

           </div>


            <div className='containerTelacartao' style={{ display: mostrarTelaEditarCartao ? 'none' : '' }}>  

               <div>

                <form onSubmit={ editarItem }>

                   <label for="titulo">Título do Produto:</label>
                   <input type="text" id="titulo" name='titulo' maxLength={30} value={valorOriginal[0]} required  />

                   <label for="descricao">Descrição do Produto:</label>
                   <textarea id='descricao' rows="7" cols="30" name='descricao' maxLength={220} value={valorOriginal[1]} required  />

                   <label for="link">Link para o Produto:</label>
                   <input type="text" id="link" name='url' value={valorOriginal[2]} required />

                   <button type='submite'>Enviar</button>
                   <button type='submite' onClick={ esconderTelaEditarCartao }>Voltar</button>

                </form>
                
               </div>

           </div>

        </div>

    )
}


export default ProdutosPage