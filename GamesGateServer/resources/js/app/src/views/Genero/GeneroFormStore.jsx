import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function GeneroFormStore() {
    const navigate = useNavigate();
 
    const [Genero, setGenero] = useState({
        id:null,
        name:'',
        email:'',
    });

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post(`/genero/store`, user)
            .then(() =>{
                setGenero({});
                console.log('Gênero incluído com sucesso');
                navigate('/genero/index')
            }).catch((error)=>{
                console.log(error);
            })
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
 
    const onCancel = (e) => {
        //e.preventDefault();
        navigate('/genero/index');
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Gênero</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={Genero.name}
                            placeholder="Gênero"
                            onChange={
                                e => setGenero({
                                    ...Genero, nome:e.target.value
                                })
                            } 
                        />
                        <br />
                        <br />
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/genero/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>   
    )
}

export default GeneroFormStore