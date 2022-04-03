import React from 'react'

//2. CrudTableRow hereda props de CrudTable (L26), en este caso setDataToEdit, deleteData. De alli pasamos a el componente CrudTableRow.jsx y destructuramos esas props.

const CrudTableRow = ({el, setDataToEdit, deleteData}) => {
  //3. destructuramos con let para que no se repita el nombre de las variables (L11 y L12). Asignamos que el objeto (id, name, constellation) sean las variables de el (elemento).
  let {id, name, constellation} = el;
  return (
    //1. Creamos CrudTableRow.jsx y asignamos la parte sustraida de CrudTable.jsx.
    <tr>
      <td>{name}</td>
      <td>{constellation}</td>
      <td>
        {/* 4. En el evento onClick del boton editar activamos el evento (arrow function) 
          setDataToEdit es la funcion que en el CrudApp actualiza la variable, que inicia nula y luego puede contener un objeto nuevo.
          setDataToEdit va a recibir a (el) que es el objeto que se esta editando (id, name, constellation).
          CrudApp.
        */}
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
}

export default CrudTableRow