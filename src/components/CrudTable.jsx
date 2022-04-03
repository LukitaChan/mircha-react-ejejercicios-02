import React from 'react'
import CrudTableRow from './CrudTableRow'

//Tabla de santos.
//1. destructuramos los atributos de la tabla CrudTable (CrudApp.jsx).
const CrudTable = ({data, setDataToEdit, deleteData}) => {
  return (
    <div>
      <h3>Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Constelacion</th>
            {/* para los botones de editar y eliminar */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* p.e. la base de datos que se crea (data) llega vacia, su longitud sea cero. Hacemos un condicional Render() para decir una advertencia o condicion. */}
          {data.length === 0 ? (
            <tr>
              <td colSpan='3'>Sin Data</td>
              {/* 2. CrudTableRow hereda props de CrudTable, en este caso setDataToEdit, deleteData. De alli pasamos a el componente CrudTableRow.jsx*/}
            </tr>) : (data.map((el) => 
            <CrudTableRow 
            key={el.id} 
            el={el} 
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
            /> ))}
          {/* 
          Este apartado se va un nuevo componente: CrudTableRow.jsx
          <tr>
            <td>Dokho</td>
            <td>Libra</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable