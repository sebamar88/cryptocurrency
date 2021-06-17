import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import PropTypes from 'prop-types';

import useMoneda from '../hooks/useMoneda';
import useCrypto from '../hooks/useCrypto';
import axios from 'axios'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding:10px;
    background-color: #66a2fe;
    border: none;
    width:100%;
    border-radius:10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({setMoneda, setCryptomoneda}) => {

    // State del listado de Cryptomonedas
    const [listaCrypto, setListaCrypto] = useState([]);
    const [ error, setError ] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de EEUU'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]

    // Utilizar Hook de monedas
    const [ moneda, SelectMoneda ] = useMoneda('Elige tu moneda', '', MONEDAS);

    // Utilizar Hook de Cryptomonedas
    const [ cryptomoneda, SelectCrypto ] = useCrypto('Elige tu Cryptomoneda', '', listaCrypto)


    // Ejecutar llamado a la API
    useEffect(()=>{
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setListaCrypto(resultado.data.Data);
        }
        consultarAPI()
    },[]);

    const handleSubmit = e =>{
        e.preventDefault()
        if(moneda.trim() === '' || cryptomoneda.trim() === ''){
            setError(true)
            return;
        }
        setError(false)
        setMoneda(moneda)
        setCryptomoneda(cryptomoneda)
        
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Todos los campos son Obligatorios" /> : null}
            <SelectMoneda />

            <SelectCrypto />

            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
     );
}

Formulario.propTypes = {
    setCryptomoneda: PropTypes.func.isRequired,
    setMoneda: PropTypes.func.isRequired
}
 
export default Formulario;