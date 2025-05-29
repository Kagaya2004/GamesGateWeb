import { useState, Fragment, useEffect } from 'react'
import axiosClient from '../../axiosClient'
import { Link, useNavigate, useParams } from 'react-router-dom';
 
 function GeneroFormDestroy() {
  const navigate = useNavigate();
  const [Genero, setGenero] = useState({
    id: null,
    name: ''
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
      axiosClient.delete(`/genero/destroy/${id}`)
        .then(() => {
          setGenero({});
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
          {genero.id && <h1>Exclusão de gênero: {genero.name}  </h1>}
        </div>

        <form onSubmit={(e)=>OnSubmit(e)}>
          <input defaultValue={genero.nome} placeholder='Gênero' readOnly={true}/>
          <button 
            className='btn btn-delete'>
              Excluir
          </button>
          <Link 
            type='button'
            className='btn btn-cancel'
            to='/genero/index'>
              Cancelar
          </Link>
        </form>
      </div>
    </Fragment>
   )
 }
 
 export default GeneroFormDestroy