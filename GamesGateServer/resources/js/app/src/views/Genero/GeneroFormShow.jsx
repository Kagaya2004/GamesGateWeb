import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
function GeneroFormShow() {
  const navigate = useNavigate();
   const [Genero, setGenero] = useState({
     id: null,
     name: '',
     email: ''
   })
   const { id } = useParams();
   
   if (id){
     useEffect(() => {
       axiosClient.get(`/genero/show/${id}`)
         .then(({data}) => {
           setGenero(data.data);
         }).catch((error) => {
           console.log(error);
         })
     }, [id]);
   }
 
     const OnSubmit = (e) => {
       e.preventDefault();
       navigate('/genero/index');
     }
  
  return (
    <Fragment>
      <div className='display'>
        <div className='card animated fadeInDown'>
          {Genero.id && <h1>Exclusão de gênero: {Genero.nome}  </h1>}
        </div>

        <form onSubmit={(e)=>OnSubmit(e)}>
          <input defaultValue={Genero.nome} placeholder='Nome do Gênero' readOnly={true}/>
          <button 
            className='btn btn-delete'>
              Excluir
          </button>
          <Link
              type='button' 
              className='btn btn-cancel'
              to='/Genero/index'>
                  Cancelar
          </Link>
        </form>
      </div>
    </Fragment>
  )
}
 
export default GeneroFormShow