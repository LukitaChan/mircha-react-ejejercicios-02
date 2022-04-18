import { useEffect, useState} from 'react'
//Un hook personalizado devuelve logica, por lo que no es necesario importar React. No es necesario hacer tan robusto el componente principal que va a usar el hook.

export const useFetch = (url) => {
  //1. Haremos 3 variables de estado: una que guarde la data de la api que estamos consultando, otra para error en caso de que el fetch traiga un error y la ultima que guarde el estado de la carga de la api.
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  //Esta permitira pasar propiedades al componente principal UI para pintar la info o no.

  //2. La logica de las VE se van a ejecutar en una funcion de efecto que se hace cada vez que se renderiza el componente. Esta seria la peticion fetch correspondiente hacia la api que estemos interactuando a travez del url.
  useEffect(() => {
    //2.1. Hacemos uso de un aboutController en caso de que la peticion fetch tarde en responder y queramos abortar la consulta.
    const aboutController = new AbortController();
    //2.2. A la peticion fetch hay que asignarle una propiedad signal que es un objeto que se puede abortar.
    const signal = aboutController.signal;
    //2.3. Ejecutamos una peticion asincrona fetch hacia la api: si se hace va a necesitar una peticion asincrona, la funcion que recibe recibe el useEffect NO sea asincrona por que es un antipatron.

    const fetchData = async() => { //3. Logica del fetchData.
    //3.1. Si setLoading es true, entonces se pintara el componente principal UI.
    setLoading(true);
  
    //3.2. Como hacemos uso de una peticion fetch, debemos hacer uso de try catch para capturar el error.
    try {
			const res = await fetch(url);
			//3.3. Validacion de la respuesta de la peticion fetch. Peticion AJAX: si err es verdadero (res.ok false), el status se toma de la respuesta (res) y en caso de que API no de status, seria "00" (la api no da status). Tambien si statusText se tomaria de la respuesta (res) y si no (vacio) manda nada da un mensaje de "Errorcito". Throw es una palabra reservada de JS que permite lanzar un error en el catch.
			if (!res.ok) {
				let err = new Error('Error en la peticion fetch');
				err.status = res.status || '00';
				err.statusText = res.statusText || 'Ocurrio un Errorcito';
        throw err;
			}
      //3.4 Si no hay error, entonces se hace una peticion fetch a la api y se guarda en data. La peticion se hizo, entonces convertimos la respuesta (res) en un json y forma asincrona.
      const json = await res.json();

      //3.5 Haremos otra validacion para el abortController ayudado del signal. Si !signal.aborted es falso (no se aborto), entonces se guarda en setData (valor actualizado) el json.
      if(!signal.aborted) {
        setData(json);        //Aqui tenemos data (res).
        setError(null);
      };

    //3.6. Que la peticion de error no significa que el error sea por abortar la peticion. Si la señal (signal) NO es abort entonces la señal es de otro tipo (por ejemplo, timeout) y se guarda en setError el error.
		} catch (error) {           //Es el error del 3.3. (err)
      if (!signal.aborted) {
				setData(null);
				setError(error);        //Aqui tenemos el error.
			}
    //3.7. Si no se aborta la peticion fetch, entonces se guarda en setError el error. Finally se ejecuta siempre, independientemente de si hay error o no.
    } finally {
      if(!signal.aborted) {
        setLoading(false);
      }
    };
  }; 
    fetchData();

    //2.4. Una caracteristica del useEffect es que cada que el efecto termine (como para limpiar el rendimiento d ememoria de la app), todo lo que ejecutemos en la funcion que puede retornar el useEffect seria similar a la funcion componentDidMount.
    return () => {AbortController.abort();}
    }, [url]);

  //4. Retornaremos un objeto con las variables de estado que queremos acceder desde el componente principal. Nota: atajos de objetos, si la propiedad es igual a la variable de estado, podemos escribir la propiedad directamente.
  return {data, error, loading};
} //Fin del useFetch para SelectList.js.
