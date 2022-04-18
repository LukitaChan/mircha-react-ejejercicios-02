import React, { useEffect, useState } from 'react';
import { helpHttp } from '../helpers/helpHTTP';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import Loader from './Loader';
import Message from './Message';

//Esta es la UI.
//1. creamos la base de datos con la que iniciara la aplicacion, en este caso api/db.json.
const CrudApi = () => {
	const [baseData, setBaseData] = useState(null); 
  //4.2.C. Pasamos el valor inicial de useState de array vacio a null, para la condicion del renderizado de la CrudTable.
	const [dataToEdit, setDataToEdit] = useState(null);

  //4. Creamos dos nuevas constantes para el manejo del message (error) y loader, apoyadas de los componentes Message y Loader respectivamente.
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

	//2. Usamos una variable para facilitar el manejo del http e inicializamos el helper.
	let api = helpHttp();
	//2.1. creamos una variable url para no estar escribiendo el endpoint en cada metodo. En este caso es la base de datos. en el puerto 5000 (checar en package.json)
	let url = 'http://localhost:5000/saint';

	//3. Creamos un useEffect para que se ejecute al iniciar la aplicacion en la variable baseData. El segundo parametro es un array vacio por que solo lo ejecutaremos la primera vez.
	useEffect(() => {
    //4.3. Antes de hacer la peticion, actualiza setLoading a true para mostrar el loader. Regresaria a falso al final de la promesa get.
    setLoading(true);
		//3.1. el helpHTTP usamos el metodo get para obtener los datos de la base de datos. El helperHTTP nos devuelve una promesa. En este caso usamos el then para obtener los datos en respuesta e imprimimos.
		api.get(url).then((res) => {
			//console.log(res);
			//3.2 cuando la promesa NO traiga un mensaje de error (Promise.reject, err: false), entonces actualizamos setBaseData con los datos que nos devuelve la base de datos.
			if (!res.err) {
				setBaseData(res);
        //4.4 Si no hubo un error por parte del helpHttp entonces setError seria nulo:
        setError(null);
			} else {
				//3.3 caso contrario (err: true) entonces setDataToEdit cargara con su valor inicial o no cargo la info (null).
				setBaseData(null);
				//4.5 Si marco error el helpHttp, genera Promise.reject donde el setError tendra el valor de la respuesta (err: true). Eso quiere decir que el setError sera iun objeto, tendra un valor y se renderizara en el componente Message (4.2.B).
        setError(res);
			}

      setLoading(false);
		});
	}, [url]);

  //6. Solo nos falta modificar cada una de las funciones create, update, delete (post, put, delete del helper).
	const createData = data => {
		data.id = Date.now();
		//console.log(data);
    //6.1 Ya que api = helpHttp... el metodo post pide la url y el objeto de las peticiones del fetch, que se obtienen de body:data, y el metodo post devuelve una promesa. La promesa nos devuelve un objeto con el error (fallo) y el resultado de la peticion (bueno o malo).

    //6.5 creamos una variable para un parametro del post.
    let options = {body:data, headers: {"content-type":"application/json"}};
    //6.6. Le especificamos a la peticion un atributo content-type. Es importante que cada peticion fetch y cada api tenga su propio objeto de opciones. No es necesario agregar (en este caso) el content-type en el header de la peticion.

    api.post(url, options)
      .then((res) => {
        //console.log(res);
        //6.2 Si no existe una propiedad err en el objeto res, entonces se actualizara el baseData con el nuevo objeto creado, en este caso lo que traiga la base de datos mas lo que traiga la respuesta que devuelve la api.
        if(!res.err) {
          setBaseData([...baseData, res]);
          //6.3 Si existe una propiedad err en el objeto res, entonces se actualizara el error con el valor de la respuesta.
        } else {
          setError(res);
        }
      });
	};

  //7.Para actualizar necesitamos saber el ID del objeto que queremos actualizar.
	const updateData = (data) => {
		//7.1. Creamos una variable endpoint para concatenar (union) la url con el id del objeto data (viene del formulario) que queremos actualizar.
		let endpoint = `${url}/${data.id}`;
		//console.log(endpoint);

		//7.2. Creamos una variable options para el metodo put.
		let options = { body: data, headers: { 'content-type': 'application/json' } };
		//7.3. Le especificamos a la peticion un atributo content-type. Es importante que cada peticion fetch y cada api tenga su propio objeto de opciones. No es necesario agregar (en este caso) el content-type en el header de la peticion.

		api.put(endpoint, options).then((res) => {
			//console.log(res);
			//7.4 Si no existe una propiedad err en el objeto res, entonces se actualizara el baseData con el nuevo objeto creado, en este caso primero haremos un mapeo para ver si los id coinciden (para no repetir elementos) y este newData tomara el nuevo valor de setBaseData.
			if (!res.err) {
        //7.6 Necesito crear unn nuevo dato que mapee la baseData; que detecte cual es el id de los datos que vienen en toda la baseData que concida con los datos que se reciben del metodo updateData. newData servira para actualizar la baseData: con esto estariamos actualizando el registro.
        let newData = baseData.map((el) => (el.id === data.id ? data : el));
        setBaseData(newData);
				//7.5. Si existe una propiedad err en el objeto res, entonces se actualizara el error con el valor de la respuesta.
			} else {
				setError(res);
			}
		});
	};

  //8. Para eliminar necesitamos saber el ID del objeto que queremos eliminar.
	const deleteData = (id) => {
		let isDelete = window.confirm(`¿Estás seguro de eliminar el registro con el id '${id}'?`);

		if (isDelete) {
		//8.1. Creamos una variable endpoint para unir la url con el id del objeto data que queremos eliminar. Creamos variable options para el metodo delete.
		let endpoint = `${url}/${id}`;
    let options = { headers: { 'content-type': 'application/json' }, };

    api.del(endpoint, options)
    .then((res) => {
      if(!res.err) {      
      //8.2. Si no existe una propiedad err en el objeto res, entonces se actualizara el baseData con el nuevo objeto creado, en este caso primero haremos un filtro para ver si los id coinciden (para no repetir elementos y quitar si es el caso) y este newData tomara el nuevo valor de setBaseData.
      /*Si es verdadero se elimina el elemento, y si no, que retorne*/
			/* Lo que se hara es filtrar y quitar el registro que traiga el ID */
			/* el newData se le asignara el filtro a la baseData donde del elemento, su el.id es diferente del id que se esta pasando. Este nuevo arreglo se ira llenando con id diferentes; si son id iguales entonces lo va a discriminar */
			let newData = baseData.filter((el) => el.id !== id);
			/* Entonces el nuevo valor de setBaseData seria el nuevo arreglo de newData. */
			setBaseData(newData);
		} else {
      //8.3 Si existe una propiedad err en el objeto res, entonces se actualizara el error con el valor de la respuesta.
      setError(res);
      }
    });
    } else {
			return;
		}
	};
  
  /* Fin del CRUD */

	return (
		<div>
			<h2>CrudApi</h2>

			<article className='grid-1-2'>
				<CrudForm
					createData={createData}
					updateData={updateData}
					dataToEdit={dataToEdit}
					setDataToEdit={setDataToEdit}
				/>
        {/* El componente que se comportara dinamicamente si hay datos o no sera la CrudTable.
        4.2 Le añadiremos un conditional render: 
          A- Si la variable de loading es true, cargaras el componente Loader
          B- Si la variable error es true, cargaras el componente Message.
          C- si la baseData tiene data, entonces renderiza la CrudTable*/}
        {loading && <Loader />}
        {/* 5. el componente Message tendra las props de la const Message */}
        {error && (<Message msg={`Errorcito ${error.status}: ${error.statusText}`} bgColor="#dc3545"  />) }
				{baseData && (<CrudTable data={baseData} setDataToEdit={setDataToEdit} deleteData={deleteData} /> )}

			</article>
		</div>
	);
};

export default CrudApi;