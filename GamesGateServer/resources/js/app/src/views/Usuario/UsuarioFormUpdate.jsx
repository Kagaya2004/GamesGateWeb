import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
function UsuarioFormUpdate() {
  const navigate = useNavigate();
   const [usuario, setUsuario] = useState({
     id: null,
     name: '',
     email: ''
   })
   const { id } = useParams();
   
   if (id){
     useEffect(() => {
       axiosClient.get(`/usuario/show/${id}`)
         .then(({data}) => {
           setUsuario(data.data);
         }).catch((error) => {
           console.log(error);
         })
     }, [id]);
   }
 
     const OnSubmit = (e) => {
       e.preventDefault();
       axiosClient.put(`/usuario/update/${id}`)
         .then((data) => {
           setUsuario(data.data);
           navigate('/usuario/index');
         }).catch((error) => {
           console.log(error);
         })
     }
     const OnCancel = () => {
       navigate('/usuario/index');
     }
  
  return (
    <Fragment>
       <div className='display'>
         <div className='card animated fadeInDown'>
           {usuario.id && <h1>Exclusão de usuário: {usuario.name}  </h1>}
         </div>
 
         <form onSubmit={(e)=>OnSubmit(e)}>
           <input 
             defaultValue={usuario.name} 
             placeholder='Nome do Usuário'
             onChange={
               e => setUsuario({ ...usuario, name: e.target.value })
             } />
           <input 
             defaultValue={usuario.email} 
             placeholder='E-mail de Usuário'
             onChange={
               e => setUsuario({ ...usuario, email: e.target.value })
             } />
           <button 
             className='btn btn-edit'>
               Salvar
           </button>
           <Link 
             type='button'
             className='btn btn-cancel'
             to='/usuario/index'>
               Cancelar
           </Link>
         </form>
       </div>
     </Fragment>
  )
}
 
 export default UsuarioFormUpdate