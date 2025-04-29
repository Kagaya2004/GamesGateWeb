import React from 'react'
import React, { useEffect, useState } from 'react'
 import axiosClient from '../../axiosClient';
 import { data, Link } from 'react-router-dom';
 
 function UsuarioFormList() {
  const [Usuarios, setUsuarios] = React.useState([]);
 
  const getUsuarios = () => {
    axiosClient.get('/user/index')
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
          <Link to="/user/store" className='btn-add'>Store</Link>
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
              Usuarios.length > 0 ? (
                Usuarios.map((usuario, index) => (
                  <tr key={index}>

                    <td>{usuario.id}</td>

                    <td>{usuario.name}</td>

                    <td>{usuario.email}</td>

                    <td className='center actions'>
                      <Link to={`/user/update/${usuario.id}`} className='btn-edit'>Update</Link>
                    </td>

                    <td className='center actions'>
                      <Link to={`/user/destroy/${usuario.id}`} className='btn-delete'>Destroy</Link>
                    </td>
                  
                    <td className='center actions'>
                      <Link to={`/user/show/${usuario.id}`} className='btn-show'>Show</Link>
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