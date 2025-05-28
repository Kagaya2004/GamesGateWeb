import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UsuarioFormList from '../views/Usuario/UsuarioFormList'
import UsuarioFormStore from '../views/Usuario/UsuarioFormStore'
import UsuarioFormUpdate from '../views/Usuario/UsuarioFormUpdate'
import UsuarioFormShow from '../views/Usuario/UsuarioFormShow'
import UsuarioFormDestroy from '../views/Usuario/UsuarioFormDestroy'
 
const Rotas = () => {
return (
    <Routes>
        <Route path="/usuario/index" element={<UsuarioFormList/>} />
        <Route path="/usuario/store" element={<UsuarioFormStore/>} />
        <Route path="/usuario/update/:id" element={<UsuarioFormUpdate/>} />
        <Route path="/usuario/show/:id" element={<UsuarioFormShow/>} />
        <Route path="/usuario/destroy/:id" element={<UsuarioFormDestroy/>} />
        <Route path="/desenvolvedora/index" element={<DesenvolvedoraFormList/>} />
        <Route path="/desenvolvedora/store" element={<DesenvovledoraFormStore/>} />
        <Route path="/desenvolvedora/update/:id" element={<DesenvolvedoraFormUpdate/>} />
        <Route path="/desenvolvedora/show/:id" element={<DesenvolvedoraFormShow/>} />
        <Route path="/desenvolvedora/destroy/:id" element={<DesenvolvedoraFormDestroy/>} />
        <Route path="/jogo/index" element={<JogoFormList/>} />
        <Route path="/jogo/store" element={<JogoFormStore/>} />
        <Route path="/jogo/update/:id" element={<JogoFormUpdate/>} />
        <Route path="/jogo/show/:id" element={<JogoFormShow/>} />
        <Route path="/jogo/destroy/:id" element={<JogoFormDestroy/>} />
        <Route path="/genero/index" element={<GeneroFormList/>} />
        <Route path="/genero/store" element={<GeneroFormStore/>} />
        <Route path="/genero/update/:id" element={<GeneroFormUpdate/>} />
        <Route path="/genero/show/:id" element={<GeneroFormShow/>} />
        <Route path="/genero/destroy/:id" element={<GeneroFormDestroy/>} />
    </Routes>
)
}

export default Rotas