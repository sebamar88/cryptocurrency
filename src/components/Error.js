import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const MensajeError = styled.p`
    background-color: #b7322C;
    padding:1rem;
    color:#FFF;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    font-family: "Bebas Neue", cursive;
    text-align: center;
`;

const Error = ({mensaje}) => {
    return ( 
        <MensajeError>{mensaje}</MensajeError>
     );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}
 
export default Error;