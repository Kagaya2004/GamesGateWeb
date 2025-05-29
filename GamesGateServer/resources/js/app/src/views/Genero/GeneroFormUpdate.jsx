import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
function GeneroFormUpdate() {
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
       axiosClient.put(`/genero/update/${id}`)
         .then((data) => {
           setGenero(data.data);
           navigate('/genero/index');
         }).catch((error) => {
           console.log(error);
         })
     }
     const OnCancel = () => {
       navigate('/genero/index');
     }
  
  return (
    <Fragment>
       <div className='display'>
         <div className='card animated fadeInDown'>
           {Genero.id && <h1>Exclusão de gênero: {Genero.nome}  </h1>}
         </div>
 
         <form onSubmit={(e)=>OnSubmit(e)}>
           <input 
             defaultValue={Genero.nome} 
             placeholder='Gênero'
             onChange={
               e => setGenero({ ...Genero, nome: e.target.value })
             } />
           <button 
             className='btn btn-edit'>
               Salvar
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
 
 export default GeneroFormUpdate