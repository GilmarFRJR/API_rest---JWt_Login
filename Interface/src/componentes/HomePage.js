import React, { useEffect, useState } from 'react'

import FormLogin from './FormLogin'
import FormCadastro from './FormCadastro'

import '../style/HomePage.css'

import fetchUSER from '../fetch/fetchUSER'


function HomePage(props){

  const [mostrarFormLogin, setMostrarFormLogin] = useState(false)
  const [mostrarFormCadastro, setMostrarFormCadastro] = useState(false)

  const [sumir, setSumir] = useState(false)
  const [aparecer, setAparecer] = useState(false)


  useEffect(() => {

    setAparecer(true)
    
    setTimeout(() => {
        setAparecer(false)
    }, 300)

}, [mostrarFormLogin, mostrarFormCadastro])


  async function fazerLogin(){

    const JWT  = await fetchUSER.checarToken()

    if (!JWT.ok){

      setSumir(true)

      setTimeout(() => {
        setMostrarFormLogin(true)
        setSumir(false)
      }, 500)

    } else {

      props.fecharHomePage()
      console.log('aaa')

    }

    

  }


  function fazerCadastro(){

    setSumir(true)

    setTimeout(() => {
      setMostrarFormCadastro(true)
      setSumir(false)
    }, 500)

  }


  function voltarDoLogin(){

    setMostrarFormLogin(false)

  }


  function voltarDoCadastro(){

    setMostrarFormCadastro(false)

  }


  function BotoesUsuario(){

    return(

      <div>

      <button className={`botoesLoginCadastro botaoLogin ${aparecer ? 'aparecer' : ''} ${sumir ? 'sumir' : ''}`} onClick={ fazerLogin }>Fazer Login</button>
      <button className={`botoesLoginCadastro botaoCadastro ${aparecer ? 'aparecer' : ''} ${sumir ? 'sumir' : ''}`} onClick={ fazerCadastro }>Criar Conta</button> 

      </div>
 
    )
  }


    return(

        <div className={`conteinerHomePage ${props.sumir}`}>

          <div className='bloco bloco1'>

             <div>

               <h1>Bem Vindo! Essa aqui é a interface da minha API RESTful</h1>

               <p>Você pode fazer login ou criar sua conta para começar a usar a API.
                  Nela você poderá criar, editar ou excluir cartões que contém informações sobre algum produto,
                  qualquer produto! Os cartões deverão conter o nome do produto, uam descrição sobre o que ele é ou faz,
                  e um link para a página de compra. Considere esse projeto como um bloco de notas para guardar coisas que
                  você quer comprar.
               </p>

             </div>

          </div>


          <div className='bloco bloco2'>

             {

                mostrarFormLogin ? <FormLogin voltarDoLogin={ voltarDoLogin } fecharHomePage={ props.fecharHomePage } /> :
                mostrarFormCadastro ? <FormCadastro voltarDoCadastro={ voltarDoCadastro } fecharHomePage={ props.fecharHomePage } />: <BotoesUsuario />


             }

          </div>

        </div>
    
    )

}


export default HomePage