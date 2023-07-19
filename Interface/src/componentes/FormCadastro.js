import React, { useEffect, useState } from 'react'

import fetchUSER from '../fetch/fetchUSER'



function FormCadastro(props){

    const [mostrarSenha1, setMostrarSenha1] = useState(false)
    const [mostrarSenha2, setMostrarSenha2] = useState(false)

    const [sumir, setSumir] = useState(false)
    const [aparecer, setAparecer] = useState(false)


    useEffect(() => {

        setAparecer(true)
        
        setTimeout(() => {
            setAparecer(false)
        }, 300)

    }, [])


    function voltar(){

        setSumir(true)
        
        setTimeout(() => {
            props.voltarDoCadastro()
          }, 500)
    }


    
    function senha1(){
        setMostrarSenha1(!mostrarSenha1)
    }

    function senha2(){
        setMostrarSenha2(!mostrarSenha2)
    }


    function irProdutosPage(){

        props.fecharHomePage()

    }



    function cadastrar(event){

        event.preventDefault()

        fetchUSER.cadastro(event)
        .then(data =>
            { 

            if (data === "erroSenha") return alert("As senhas estão divergentes")
            if (data === "erroEmail") return alert("Esse email já foi registrado, por favor, use outro.")

            irProdutosPage()

            }
            )

        

    }




    return(

        <div className={`formDiv ${aparecer ? 'aparecer' : ''} ${sumir ? 'sumir' : ''}`}>

              <form onSubmit={ cadastrar } className='formLoginCAdastro'>

              <label for="nome">Seu Nome:</label>
              <input type="text" id="nome" name='nome' minlength="5" required />


              <label for="email">Seu Email:</label>
              <input type="email" id="email" className='excecao' name='email' maxlength="50" required />


              <label for="senha">Sua Senha:</label>
              <input className={mostrarSenha1 ? 'senhaVisivel' : ''} type={mostrarSenha1 ? 'text' : 'password'} id="senha" name='senha1' minlength="8" required />


              <label for="senhaCheck">Repita sua senha:</label>
              <input className={mostrarSenha2 ? 'senhaVisivel' : ''} type={mostrarSenha2 ? 'text' : 'password'} id="senhaCheck" name='senha2' minlength="8" required />


              <button type='submit' className='botoesEnviarVoltar botaoEnviar'>ENVIAR</button>


              <div 
              onMouseDown={senha1}
              onMouseUp={senha1}
              onMouseLeave={() => setMostrarSenha1(false)}
              className='fotoOlho foto2'>
              </div> 


              <div 
              onMouseDown={senha2}
              onMouseUp={senha2}
              onMouseLeave={() => setMostrarSenha2(false)}
              className='fotoOlho foto3'>
              </div> 

              </form>

              <button onClick={ voltar } className='botoesEnviarVoltar botaoVoltar'>VOLTAR</button>
              

        </div>

    )
}


export default FormCadastro