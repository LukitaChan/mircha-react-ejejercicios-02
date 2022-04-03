import React, { useState } from 'react';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';

//1. creamos la base de datos con la que iniciara la aplicacion.
const initialBaseData = [
  {id: 1,
  name: 'Seiya',
  constellation: 'Pegaso',},
  {id: 2,
  name: 'Shiryu',
  constellation: 'Dragon',},
  {id: 3,
  name: 'Hyoga',
  constellation: 'Cisne',},
  {id: 4,
  name: 'Shun',
  constellation: 'Andromeda',},
  {id: 5,
  name: 'Ikki',
  constellation: 'Phoenix',}
];

const CrudApp = () => {
  //5. Creamos una variable de estado para manejar los datos (incorporamos useState) de la base de datos.
  const [baseData, setBaseData] = useState(initialBaseData);
  //8. Creamos una variable de estado que nos permita saber si es una funcion de insercion (null) o de actualizacion (true).
  const [dataToEdit, setDataToEdit] = useState(null);

  //7. Creamos funciones para crear, actualizar, borrar (manejare de algun modo) las peticiones del crud.
  const createData = (data) => {
    //12. Llamar a la base de datos y agregar un nuevo registro (data). se signa a setBaseData para que se actualice la base de datos.
    data.id = Date.now();
    //console.log(data);
    setBaseData([...baseData, data]);
  };

  //13. La funcion para actualizar el estado. Basados en el id del registro para actualizar el data.
  const updateData = (data) => {
    //14. newData hace un mapeo de la base de datos y busca el registro que coincida con el id del registro que se esta actualizando: si el el.id es igual a data.id, en esa posicion se se remplaza la data, en caso contrario el elemento se conserva. Esto ya genera la funcionalidad de edicion.
    let newData = baseData.map((el) => (el.id === data.id ? data : el));
    setBaseData(newData);
  }

  //7.1 no es necesaria toda la data, solo el id bastara para actualizar.
  //15. Creamos la eliminacion del registro, asignamos una variable que recibe y elimina el registro que coincida con el id. La ventana de confirmacion generara un boolean dependiento de si se confirma o no.
  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`);
    if(isDelete) { /*Si es verdadero se elimina el elemento, y si no, que retorne*/
    /* Lo que se hara es filtrar y quitar el registro que traiga el ID */
    /* el newData se le asignara el filtro a la baseData donde del elemento, su el.id es diferente del id que se esta pasando. Este nuevo arreglo se ira llenando con id diferentes; si son id iguales entonces lo va a discriminar */
    let newData = baseData.filter((el) => el.id !== id);
    /* Entonces el nuevo valor de setBaseData seria el nuevo arreglo de newData. */
    setBaseData(newData);
    } else {
      return;
    }
  } /* Fin del CRUD */

  return (
    <div>
      <h2>CrudApp</h2>
      {/* 2. Importamos desde la CrudForm 
          9. createData, updateData, deleteData son las funciones que se ejecutaran en el formulario por los componentes hijos.
            createData(prop) se ejecutara cuando se haga la creacion del formulario
            updateData(prop) se ejecutara cuando se haga la actualizacion del formulario 
            para delete estaran los regsitros en la tabla (button eliminar)
          para diferenciar entre la creacion y la actualizacion, usamos la variable de estado dataToEdit y la funcion que la actualiza.

      */}

      <article className="grid-1-2"> 
      {/* 3. Creamos un article-grid para hacer responsive la app: el mobil a 1 columna y el texto a 2 columnas*/}
        <CrudForm 
          createData={createData} 
          updateData={updateData} 
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {/* 3. Importamod desde la CrudApp
            4. al CrudTable podemos pasarle una prop que permita renderizar los datos de initialBaseData 
            6. Pasamos la const baseData como prop de CrudTable (en data)
            10. la tabla necesita la funcion que va a eliminar los datos (deleteData).
            11. Neceistamos la funcion actualizadora del formulario (setDataToEdit) para que el formulario pueda actualizar los datos. Cuando se de click en el boton de editar, los datos de la tabla se iran al formulario. 
      
      */}
        <CrudTable 
          data={baseData} 
          setDataToEdit={setDataToEdit}
          deleteData={deleteData} 
        />
      </article>
    </div>
  );
};

export default CrudApp