import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
 function UsuarioFormDestroy() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    id: null,
    name: '',
    email: ''
  })
  const { id } = useParams();
  
  if (id){
    useEffect(() => {
      axiosClient.get(`/user/show/${id}`)
        .then(({data}) => {
          setUsuario(data.data);
        }).catch((error) => {
          console.log(error);
        })
    }, [id]);
  }

    const OnSubmit = (e) => {
      e.preventDefault();
      axiosClient.delete(`/user/destroy/${id}`)
        .then(() => {
          setUsuario({});
          navigate('/user/index');
        }).catch((error) => {
          console.log(error);
        })
    }
    const OnCancel = () => {
      navigate('/user/index');
    } 
  
  return (
    <Fragment>
      <div className='display'>
        <div className='card animated fadeInDown'>
          {usuario.id && <h1>Exclusão de usuário: {usuario.name}  </h1>}
        </div>

        <form onSubmit={(e)=>OnSubmit(e)}>
          <input defaultValue={usuario.name} placeholder='Nome do Usuário' readOnly={true}/>
          <input defaultValue={usuario.email} placeholder='E-mail de Usuário' readOnly={true}/>
          <button 
            className='btn btn-delete'>
              Excluir
          </button>
          <Link 
            type='button'
            className='btn btn-cancel'
            to='/user/index'>
              Cancelar
          </Link>
        </form>
      </div>
    </Fragment>
   )
 }
 
 export default UsuarioFormDestroy