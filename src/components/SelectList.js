//import React from 'react'
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import Message from "./Message";

//Componente para cada select de la lista: estado, municipio y colonia. Destructuramos los componentes del SelectList.
const SelectList = ({title, url, handleChange}) => {
  //1. Hacemos llamar a nuestro hook personalizado useFetch y necesita un url. Destructuramos los valores que retorna el hook.
  const {data, error, loading} = useFetch(url);
  //console.log(data, error, loading);

  //2. Para evitar errores incesesarios en el render, creamos un conditional render. Si no hay data, regresa un null.
  if(!data) return null;
  //4. Manejo de error:
  if(error) {
    return <Message 
      msg={`Error ${error.status}: ${error.statusText}`} bgColor="#dc3545" />
  };


  //3. Creamos una variable id para el label de select. Title viene como prop de cada componente. Variables dinamicas.
  let id = `select-${title}`;
  //3.1. Variable para que el title tenga primer letra mayuscula y resto minucula.
  let label = title.charAt(0).toUpperCase() + title.slice(1);
  //4.4. Creamos una variable para el valor de cada option que ingresa desde la api por su name data.response. Usamos la prop de title por que coincide con el name que tiene la api. Esto nos genera un arreglo que trae todos los datos de la api: estado, municipios y colonia.
  let options = data.response[title];
  //console.log(options)

  return (
    <>
      <label htmlFor={id} >{label}</label>

      {/* 4. Para que el usuario visualmente vea que cuando seleccione el SelectList de "estados" y este esperando el siguiente select mientras espera la informacion podriamos hacer visible el Loader. Usaremos un conditional render.*/}
      {loading && <Loader /> }

      <select name={id} id={id} onChange={handleChange} >
      {/* 4.1. asignamos la prop. que se asigna al evento onChange (handleChange) */}
        <option value="">Elige uno de los {title}</option>

        {/* 4.2. Hacemos otro conditional render para los data que estan siendo pasados desde la api. Dada la naturaleza de esta api se hara uso de las propiedades dinamicas de los objetos: un map. */}
        {data && options.map((el) => (
          <option key={el} value={el}>{el}</option>
          ))}
      </select>
    </>
  )
}

export default SelectList;