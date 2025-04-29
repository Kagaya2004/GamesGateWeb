import React from 'react'
 import { Routes, Route } from 'react-router-dom'
 import UsuarioFormList from '../views/user/UserFormList'
 import UsuarioFormStore from '../views/user/UserFormStore'
 import UsuarioFormUpdate from '../views/user/UserFormUpdate'
 import UsuarioFormShow from '../views/user/UserFormShow'
 import UsuarioFormDestroy from '../views/user/UserFormDestroy'
 
 
 const Rotas = () => {
   return (
     <Routes>
         <Route path="/user/index" element={<UsuarioFormList />} />
         <Route path="/user/store" element={<UsuarioFormStore />} />
         <Route path="/user/update" element={<UsuarioFormUpdate />} />
         <Route path="/user/show" element={<UsuarioFormShow />} />
         <Route path="/user/destroy" element={<UsuarioFormDestroy />} />
     </Routes>
   )
 }
 
 export default Rotas