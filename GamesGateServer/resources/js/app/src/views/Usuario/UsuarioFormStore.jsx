import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UsuarioFormStore() {
    const navigate = useNavigate();
 
    const [usuario, setUsuario] = useState({
        id:null,
        name:'',
        email:'',
    });

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post(`/usuario/store`, user)
            .then(() =>{
                setUsuario({});
                console.log('Usuário incluído com sucesso');
                navigate('/usuario/index')
            }).catch((error)=>{
                console.log(error);
            })
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
 
    const onCancel = (e) => {
        //e.preventDefault();
        navigate('/usuario/index');
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Usuário</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={usuario.name}
                            placeholder="Nome Completo"
                            onChange={
                                e => setUsuario({
                                    ...usuario, name:e.target.value
                                })
                            } 
                        />
                        <input
                            type="text"
                            value={usuario.username}
                            placeholder="Username de Usuário*"
                            onChange={
                                e => setUsuario({
                                    ...usuario, username:e.target.value
                                })
                            }
                        />
                        <input
                            type='datetime'
                            value={usuario.dataNascimento}
                            placeholder="Data de Nascimento"
                            onChange={
                                e => setUsuario({
                                    ...usuario, dataNascimento:e.target.value
                                })
                            }
                        />
                        <input
                            value={usuario.email}
                            placeholder="Email"
                            onChange={
                                e => setUsuario({
                                    ...usuario, email:e.target.value
                                })
                            } 
                        />
                        <input
                            type="password"
                            value={usuario.password}
                            placeholder="Senha"
                            onChange={
                                e => setUsuario({
                                    ...usuario, password:e.target.value
                                })
                            } 
                        />
                        <input 
                            type="text"
                            value={usuario.descricao}
                            placeholder="Descrição"
                            onChange={
                                e => setUsuario({
                                    ...usuario, descricao:e.target.value
                                })
                            }
                        />
                        <br />
                        <br />
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/usuario/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>


            </div>
        </Fragment>   
    )
}

export default UsuarioFormStore