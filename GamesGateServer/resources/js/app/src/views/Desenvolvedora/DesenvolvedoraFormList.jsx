import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { data, Link } from 'react-router-dom';
 
 function DesenvolvedoraFormList() {
  const [Desenvolvedora, setDesenvolvedora] = React.useState([]);
 
  const getDesenvolvedoras = () => {
    axiosClient.get('/desenvolvedora/index')
              .then(({data}) => {
                setDesenvolvedora(data.data);
              }
              ).catch((error) => {
                console.log(error);
              })
  }

  useEffect(() => {
    getDesenvolvedoras();
  }, []); 
  
  return (
    <div className='display'>
      <div className='card animated fadeInDown'>
      
        <div style={{
          display: 'flex',
          justifyContent: 'justify-content',
          alignItems: 'center', 
        }}>

          <h1>Lista de Desenvolvedoras</h1>
          <Link to="/desenvolvedora/store" className='btn-add'>Store</Link>
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
              Desenvolvedora.length > 0 ? (
                Desenvolvedora.map((Desenvolvedora, index) => (
                  <tr key={index}>

                    <td>{Desenvolvedora.id}</td>

                    <td>{Desenvolvedora.nome}</td>

                    <td>{Desenvolvedora.email}</td>

                    <td className='center actions'>
                      <Link to={`/desenvolvedora/update/${Desenvolvedora.id}`} className='btn-edit'>Update</Link>
                    </td>

                    <td className='center actions'>
                      <Link to={`/desenvolvedora/destroy/${Desenvolvedora.id}`} className='btn-delete'>Destroy</Link>
                    </td>
                  
                    <td className='center actions'>
                      <Link to={`/desenvolvedora/show/${Desenvolvedora.id}`} className='btn-show'>Show</Link>
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
 
 export default DesenvolvedoraFormList