import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
function UsuarioFormShow() {
  const navigate = useNavigate();
   const [Usuario, setUsuario] = useState({
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
       navigate('/usuario/index');
     }
  
  return (
    <Fragment>
      <div className='display'>
        <div className='card animated fadeInDown'>
          {Usuario.id && <h1>Exclusão de usuário: {Usuario.nome}  </h1>}
        </div>

        <form onSubmit={(e)=>OnSubmit(e)}>
          <input defaultValue={Usuario.nome} placeholder='Nome do Usuário' readOnly={true}/>
          <input defaultValue={Usuario.email} placeholder='E-mail de Usuário' readOnly={true}/>
          <button 
            className='btn btn-delete'>
              Excluir
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
 
export default UsuarioFormShow