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
    </Routes>
)
}

export default Rotas