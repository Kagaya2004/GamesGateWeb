import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { data, Link } from 'react-router-dom';
 
 function GeneroFormList() {
  const [Genero, setGenero] = React.useState([]);
 
  const getGeneros = () => {
    axiosClient.get('/genero/index')
              .then(({data}) => {
                setGenero(data.data);
              }
              ).catch((error) => {
                console.log(error);
              })
  }

  useEffect(() => {
    getGeneros();
  }, []); 
  
  return (
    <div className='display'>
      <div className='card animated fadeInDown'>
      
        <div style={{
          display: 'flex',
          justifyContent: 'justify-content',
          alignItems: 'center', 
        }}>

          <h1>Lista de Gêneros</h1>
          <Link to="/genero/store" className='btn-add'>Store</Link>
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
              Genero.length > 0 ? (
                Genero.map((Genero, index) => (
                  <tr key={index}>

                    <td>{Genero.id}</td>

                    <td>{Genero.nome}</td>

                    <td>{Genero.email}</td>

                    <td className='center actions'>
                      <Link to={`/genero/update/${Genero.id}`} className='btn-edit'>Update</Link>
                    </td>

                    <td className='center actions'>
                      <Link to={`/genero/destroy/${Genero.id}`} className='btn-delete'>Destroy</Link>
                    </td>
                  
                    <td className='center actions'>
                      <Link to={`/Genero/show/${Genero.id}`} className='btn-show'>Show</Link>
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
 
 export default GeneroFormList