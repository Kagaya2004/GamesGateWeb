import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { data, Link } from 'react-router-dom';
 
 function UsuarioFormList() {
  const [Usuario, setUsuario] = React.useState([]);
 
  const getUsuarios = () => {
    axiosClient.get('/usuario/index')
              .then(({data}) => {
                setUsuario(data.data);
              }
              ).catch((error) => {
                console.log(error);
              })
  }

  useEffect(() => {
    getUsuarios();
  }, []); 
  
  return (
    <div className='display'>
      <div className='card animated fadeInDown'>
      
        <div style={{
          display: 'flex',
          justifyContent: 'justify-content',
          alignItems: 'center', 
        }}>

          <h1>Lista de Usuários</h1>
          <Link to="/usuario/store" className='btn-add'>Store</Link>
        </div>
        <table>
          
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th className='center actions' colSpan={3}>Ações</th>
            </tr>
          </thead>

          <tbody>
            {
              Usuario.length > 0 ? (
                Usuario.map((usuario, index) => (
                  <tr key={index}>

                    <td>{usuario.id}</td>

                    <td>{usuario.nome}</td>

                    <td>{usuario.email}</td>

                    <td className='center actions'>
                      <Link to={`/usuario/update/${usuario.id}`} className='btn-edit'>Update</Link>
                    </td>

                    <td className='center actions'>
                      <Link to={`/usuario/destroy/${usuario.id}`} className='btn-delete'>Destroy</Link>
                    </td>
                  
                    <td className='center actions'>
                      <Link to={`/usuario/show/${usuario.id}`} className='btn-show'>Show</Link>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td>Nenhum Registro encontrado</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
   )
 }
 
 export default UsuarioFormList