import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function JogoFormStore() {
    const navigate = useNavigate();
 
    const [Jogo, setJogo] = useState({
        id:null,
        nome:'',
        email:'',
    });

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post(`/jogo/store`, jogo)
            .then(() =>{
                setJogo({});
                console.log('Jogo incluído com sucesso');
                navigate('/jogo/index')
            }).catch((error)=>{
                console.log(error);
            })
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
 
    const onCancel = (e) => {
        //e.preventDefault();
        navigate('/jogo/index');
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Jogo</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={Jogo.nome}
                            placeholder="Jogo"
                            onChange={
                                e => setJogo({
                                    ...Jogo, nome:e.target.value
                                })
                            } 
                        />
                        <input
                            type="text"
                            value={Jogo.descricao}
                            placeholder="Descrição do Jogo"
                            onChange={
                                e => setJogo({
                                    ...Jogo, descricao:e.target.value
                                })
                            }
                        />
                        <input
                            type='datetime'
                            value={Jogo.dataLancamento}
                            placeholder="Data de Lançamento"
                            onChange={
                                e => setJogo({
                                    ...Jogo, dataLancamento:e.target.value
                                })
                            }
                        />
                        <br />
                        <br />
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/Jogo/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>   
    )
}

export default JogoFormStore