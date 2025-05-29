import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UsuarioFormStore() {
    const navigate = useNavigate();
 
    const [Usuario, setUsuario] = useState({
        id:null,
        name:'',
        email:'',
    });

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post(`/usuario/store`, usuario)
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
                            value={Usuario.name}
                            placeholder="Nome Completo"
                            onChange={
                                e => setUsuario({
                                    ...Usuario, nome:e.target.value
                                })
                            } 
                        />
                        <input
                            type="text"
                            value={Usuario.username}
                            placeholder="Username de Usuário*"
                            onChange={
                                e => setUsuario({
                                    ...Usuario, username:e.target.value
                                })
                            }
                        />
                        <input
                            type='datetime'
                            value={Usuario.dataNascimento}
                            placeholder="Data de Nascimento"
                            onChange={
                                e => setUsuario({
                                    ...Usuario, dataNascimento:e.target.value
                                })
                            }
                        />
                        <input
                            value={Usuario.email}
                            placeholder="Email"
                            onChange={
                                e => setUsuario({
                                    ...Usuario, email:e.target.value
                                })
                            } 
                        />
                        <input
                            type="password"
                            value={Usuario.password}
                            placeholder="Senha"
                            onChange={
                                e => setUsuario({
                                    ...Usuario, password:e.target.value
                                })
                            } 
                        />
                        <input 
                            type="text"
                            value={Usuario.descricao}
                            placeholder="Descrição"
                            onChange={
                                e => setUsuario({
                                    ...Usuario, descricao:e.target.value
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