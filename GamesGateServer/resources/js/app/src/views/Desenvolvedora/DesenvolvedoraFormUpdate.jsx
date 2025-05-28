import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
function DesenvolvedoraFormUpdate() {
  const navigate = useNavigate();
   const [Desenvolvedora, setDesenvolvedora] = useState({
     id: null,
     name: '',
     email: ''
   })
   const { id } = useParams();
   
   if (id){
     useEffect(() => {
       axiosClient.get(`/desenvolvedora/show/${id}`)
         .then(({data}) => {
           setDesenvolvedora(data.data);
         }).catch((error) => {
           console.log(error);
         })
     }, [id]);
   }
 
     const OnSubmit = (e) => {
       e.preventDefault();
       axiosClient.put(`/desenvolvedora/update/${id}`)
         .then((data) => {
           setDesenvolvedora(data.data);
           navigate('/desenvolvedora/index');
         }).catch((error) => {
           console.log(error);
         })
     }
     const OnCancel = () => {
       navigate('/desenvolvedora/index');
     }
  
  return (
    <Fragment>
       <div className='display'>
         <div className='card animated fadeInDown'>
           {Desenvolvedora.id && <h1>Exclusão de desenvolvedora: {Desenvolvedora.nome}  </h1>}
         </div>
 
         <form onSubmit={(e)=>OnSubmit(e)}>
           <input 
             defaultValue={Desenvolvedora.nome} 
             placeholder='Nome do Desenvolvedora'
             onChange={
               e => setDesenvolvedora({ ...Desenvolvedora, nome: e.target.value })
             } />
           <input 
             defaultValue={Desenvolvedora.email} 
             placeholder='E-mail de Desenvolvedora'
             onChange={
               e => setDesenvolvedora({ ...Desenvolvedora, email: e.target.value })
             } />
           <button 
             className='btn btn-edit'>
               Salvar
           </button>
           <Link 
             type='button'
             className='btn btn-cancel'
             to='/desenvolvedora/index'>
               Cancelar
           </Link>
         </form>
       </div>
     </Fragment>
  )
}
 
 export default DesenvolvedoraFormUpdate