import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { data, Link } from 'react-router-dom';
 
 function JogoFormList() {
  const [Jogo, setJogo] = React.useState([]);
 
  const getJogos = () => {
    axiosClient.get('/jogo/index')
              .then(({data}) => {
                setJogo(data.data);
              }
              ).catch((error) => {
                console.log(error);
              })
  }

  useEffect(() => {
    getJogos();
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
          <Link to="/jogo/store" className='btn-add'>Store</Link>
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
              Jogo.length > 0 ? (
                Jogo.map((Jogo, index) => (
                  <tr key={index}>

                    <td>{Jogo.id}</td>

                    <td>{Jogo.nome}</td>

                    <td>{Jogo.descricao}</td>

                    <td className='center actions'>
                      <Link to={`/jogo/update/${Jogo.id}`} className='btn-edit'>Update</Link>
                    </td>

                    <td className='center actions'>
                      <Link to={`/jogo/destroy/${Jogo.id}`} className='btn-delete'>Destroy</Link>
                    </td>
                  
                    <td className='center actions'>
                      <Link to={`/jogo/show/${Jogo.id}`} className='btn-show'>Show</Link>
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
 
 export default JogoFormList