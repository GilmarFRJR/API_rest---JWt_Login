import React, { useEffect, useState } from 'react'

import fetchUSER from '../fetch/fetchUSER'



function FormLogin(props){

    const [mostrarSenha, setMostrarSenha] = useState(false)

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
            props.voltarDoLogin()
          }, 500)

    }


    function irProdutosPage(){

        props.fecharHomePage()
    
    }


    function senha(){
        setMostrarSenha(!mostrarSenha)
    }




    function login(event){

        event.preventDefault()

        fetchUSER.login(event)
        .then(data =>
            { 

            if (data === "erroDados") return alert("Algum dado não está correto.")

            irProdutosPage()

            }
            )

    }


    return(

        <div className={`formDiv ${aparecer ? 'aparecer' : ''} ${sumir ? 'sumir' : ''}`}>

         <form onSubmit={ login } className='formLoginCAdastro'>

           <label for="email">Seu Email:</label>
           <input type="text" id="email" name='email' />
           
           <label for="senha">Sua Senha:</label>
           <input className={mostrarSenha ? 'senhaVisivel' : ''} type={mostrarSenha ? 'text' : 'password'} id="senha" name='senha' />
           

           <button type='submit' className='botoesEnviarVoltar botaoEnviar'>ENVIAR</button>

           <div 
           onMouseDown={senha}
           onMouseUp={senha}
           onMouseLeave={() => setMostrarSenha(false)}
           className='fotoOlho foto1'>
           </div> 

         </form>


         <button onClick={ voltar } className='botoesEnviarVoltar botaoVoltar'>VOLTAR</button>

        </div>

    )
}


export default FormLogin