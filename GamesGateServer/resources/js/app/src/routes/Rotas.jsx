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
        <Route path="/user/index" element={<UsuarioFormList/>} />
        <Route path="/user/store" element={<UsuarioFormStore/>} />
        <Route path="/user/update" element={<UsuarioFormUpdate/>} />
        <Route path="/user/show" element={<UsuarioFormShow/>} />
        <Route path="/user/destroy" element={<UsuarioFormDestroy/>} />
    </Routes>
)
}

export default Rotas