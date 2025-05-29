import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
function JogoFormUpdate() {
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
       axiosClient.put(`/jogo/update/${id}`)
         .then((data) => {
           setJogo(data.data);
           navigate('/jogo/index');
         }).catch((error) => {
           console.log(error);
         })
     }
     const OnCancel = () => {
       navigate('/jogo/index');
     }
  
  return (
    <Fragment>
       <div className='display'>
         <div className='card animated fadeInDown'>
           {Jogo.id && <h1>Exclusão de jogo: {Jogo.nome}  </h1>}
         </div>
 
         <form onSubmit={(e)=>OnSubmit(e)}>
           <input 
             defaultValue={jogo.nome} 
             placeholder='Nome do Jogo'
             onChange={
               e => setJogo({ ...Jogo, nome: e.target.value })
             } />
           <input 
             defaultValue={Jogo.descricao} 
             placeholder='Descrição do Jogo'
             onChange={
               e => setJogo({ ...Jogo, email: e.target.value })
             } />
             <input 
             defaultValue={Jogo.dataLancamento} 
             placeholder='Data de Lançamento do Jogo'
             onChange={
               e => setJogo({ ...Jogo, dataLancamento: e.target.value })
             } />
           <button 
             className='btn btn-edit'>
               Salvar
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
 
 export default JogoFormUpdate