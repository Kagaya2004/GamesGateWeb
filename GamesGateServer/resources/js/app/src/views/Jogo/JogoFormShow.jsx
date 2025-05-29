import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
function JogoFormShow() {
  const navigate = useNavigate();
   const [Jogo, setJogo] = useState({
     id: null,
     name: '',
     email: ''
   })
   const { id } = useParams();
   
   if (id){
     useEffect(() => {
       axiosClient.get(`/jogo/show/${id}`)
         .then(({data}) => {
           setJogo(data.data);
         }).catch((error) => {
           console.log(error);
         })
     }, [id]);
   }
 
     const OnSubmit = (e) => {
       e.preventDefault();
       navigate('/jogo/index');
     }
  
  return (
    <Fragment>
      <div className='display'>
        <div className='card animated fadeInDown'>
          {Jogo.id && <h1>Exclusão de jogo: {Jogo.nome}  </h1>}
        </div>

        <form onSubmit={(e)=>OnSubmit(e)}>
          <input defaultValue={Jogo.nome} placeholder='Nome do Jogo' readOnly={true}/>
          <input defaultValue={Jogo.descricao} placeholder='Descrição de Jogo' readOnly={true}/>
          <button 
            className='btn btn-delete'>
              Excluir
          </button>
          <Link
              type='button' 
              className='btn btn-cancel'
              to='/jogo/index'>
                  Cancelar
          </Link>
        </form>
      </div>
    </Fragment>
  )
}
 
export default JogoFormShow