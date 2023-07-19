import React, { useState } from 'react'

import HomePage from './HomePage'
import ProdutosPage from './ProdutosPage'




function App(){

    const [fecharHomePage, setFecharHomePage] =  useState(true)

    const [sumir, setSumir] = useState(false)
 

    function FecharHomePage(){

        setSumir(true)

        setTimeout(() => {
          setFecharHomePage(false)
        }, 500)

    }


    return(

        <div>

            {
                fecharHomePage ? <HomePage fecharHomePage={ FecharHomePage } sumir={ sumir ? 'sumir' : '' }/> : 
                <ProdutosPage />
            }

        </div>
    
    )

}


export default App