import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function DesenvolvedoraFormStore() {
    const navigate = useNavigate();
 
    const [Desenvolvedora, setDesenvolvedora] = useState({
        id:null,
        nome:'',
        email:'',
    });

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post(`/desenvolvedora/store`, desenvolvedora)
            .then(() =>{
                setDesenvolvedora({});
                console.log('Desenvolvedora incluída com sucesso');
                navigate('/desenvolvedora/index')
            }).catch((error)=>{
                console.log(error);
            })
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
 
    const onCancel = (e) => {
        //e.preventDefault();
        navigate('/desenvolvedora/index');
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Desenvolvedora</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={Desenvolvedora.nome}
                            placeholder="Nome"
                            onChange={
                                e => setDesenvolvedora({
                                    ...Desenvolvedora, nome:e.target.value
                                })
                            } 
                        />
                        <input
                            type="text"
                            value={Desenvolvedora.pais}
                            placeholder="País da Desenvolvedora"
                            onChange={
                                e => setDesenvolvedora({
                                    ...Desenvolvedora, pais:e.target.value
                                })
                            }
                        />
                        <input
                            type='text'
                            value={Desenvolvedora.email}
                            placeholder="Email"
                            onChange={
                                e => setDesenvolvedora({
                                    ...Desenvolvedora, email:e.target.value
                                })
                            }
                        />
                        <input
                            value={Desenvolvedora.descricao}
                            placeholder="Descrição"
                            onChange={
                                e => setDesenvolvedora({
                                    ...Desenvolvedora, descricao:e.target.value
                                })
                            } 
                        />
                        <br />
                        <br />
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/desenvolvedora/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>   
    )
}

export default DesenvolvedoraFormStore