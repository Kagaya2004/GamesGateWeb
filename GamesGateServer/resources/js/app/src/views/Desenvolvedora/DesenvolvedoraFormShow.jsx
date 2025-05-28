import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
function DesenvolvedoraFormShow() {
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
       navigate('/desenvolvedora/index');
     }
  
  return (
    <Fragment>
      <div className='display'>
        <div className='card animated fadeInDown'>
          {Desenvolvedora.id && <h1>Exclusão de usuário: {Desenvolvedora.nome}  </h1>}
        </div>

        <form onSubmit={(e)=>OnSubmit(e)}>
          <input defaultValue={Desenvolvedora.nome} placeholder='Nome do Desenvolvedora' readOnly={true}/>
          <input defaultValue={Desenvolvedora.email} placeholder='E-mail de Desenvolvedora' readOnly={true}/>
          <button 
            className='btn btn-delete'>
              Excluir
          </button>
          <Link
              type='button' 
              className='btn btn-cancel'
              to='/Desenvolvedora/index'>
                  Cancelar
          </Link>
        </form>
      </div>
    </Fragment>
  )
}
 
export default DesenvolvedoraFormShow