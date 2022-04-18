//Mensaje personalizado de carga. Su estilo css estara con Loader.css.
//Message estara en caso de que se maneje algun tipo de error.
import React from 'react';

//Podemos pasarle props al mensaje que se imprimira; el msg y el colorfondo (bgColor).
const Message = ({ msg, bgColor }) => {
  //Agregamos estilos al mensaje.
  let styles = {
    padding: '10px',
    marginBottom: '10px',
    testAliign: 'center',
    color: "#fff",
    fontWeight: 'bold',
    backgroundColor: bgColor,
  }
  return (
    <div style={styles}>
      <h4>{msg}</h4>
      </div>
  ); //El msg y bgColor son prop que deberan pasar al componente Message expuesto en CrudApi.
};

export default Message