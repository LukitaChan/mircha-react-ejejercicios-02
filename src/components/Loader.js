//Creamos un loader para dar tiempo a la api de gestionar los datos.
//Loader mientras los datos van cargando entre una peticion y otra aparecera el loader.
import React from 'react'
import "../stylesheets/Loader.css";

const Loader = () => {
  return (
    <div className="lds-ellipsis">
      <div>
        </div>
        <div>
        </div>
    </div>
	);
};

export default Loader;

