import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap:2rem;
  }
`;  

const Imagen = styled.img`
  max-width:100%;
  margin-top:5rem;
  height:auto;
`;

const Titulo = styled.h1`
  color: white;
  font-family: 'Bebas Neue';
  text-align:left;
  font-weight:700;
  font-size:50px;
  margin: 80px 0 50px 0;

  &::after {
    content: '';
    width:100px;
    height:6px;
    background-color:#66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [crytomoneda, setCryptomoneda ] = useState('');
  const [cotizacion, setCotizacion ] = useState({});
  const [ cargando, setCargando ] = useState(false);

  useEffect(() =>{

    const consultarAPI = async () => {
      if(moneda === '') return;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crytomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      setCargando(true)

      setTimeout(() => {
        setCargando(false)
        setCotizacion(resultado.data.DISPLAY[crytomoneda][moneda]);
      }, 1000)

      
    }
    consultarAPI()
  },[moneda, crytomoneda])

  //mostrar Spinner o Resultado

  const component = (cargando) ? <Spinner /> : <Cotizacion resultado={cotizacion} />


  return (
    <Contenedor>
      <div> 
        <Imagen src={imagen} alt="Imagen Crypto" />
      </div>
      <div>
        <Titulo>COTIZA CRYPTOCURRENCIES AL INSTANTE</Titulo>
        <Formulario
        setCryptomoneda={setCryptomoneda}
        setMoneda = {setMoneda}
        />
        {component}
      </div>
      
    </Contenedor>
  );
}

export default App;
