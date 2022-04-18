//Documento Helper para peticiones AJAX.
//Este helper trabajara con un closure; dentro tendra los metodos que se van a utilizar. Unos seran privados y otros públicos.
export const helpHttp = () => {
	//1. customFetch usara la logica REST para hacer peticiones.
	//2. la peticion fetch necesita una url y una configuracion.
	const customFetch = (endpoint, options) => {
		//A. La data usualmente se regresa en .JSON, entonces le creamos una cabecera por defecto que acepte el formato JSON.
		const defaultHeader = {
			accept: 'application/json'
		};

		//La AbortController representa un objeto controlador que le permite cancelar una o más solicitudes web cuando lo desee. Puede crear un nuevo AbortController utilizando el AbortController(). La comunicación con una solicitud DOM se realiza mediante un AbortSignal.

		const controller = new AbortController();
		//B. Opcion de peticion fetch: Creamos una variable que va a contener la configuracion de la peticion. el signal es el objeto que nos permite cancelar la peticion.

		options.signal = controller.signal;

		//C. Opcion de peticion fetch: el metodo. El metodo fetch es una promesa. Si el usuario en el objeto de opciones trae metodo, dejar el metodo pero si no, poner el metodo GET.

		options.method = options.method || 'GET';
		//D. Para las cabeceras (defaultHeaders). Si hacemos una peticion a una API que y el usuario especifica alguna headers (viene), entonces se hara un nuevo objeto con las cabeceras del usuario y las del default. En caso contrario, se hara un nuevo objeto con las cabeceras del default.
		options.headers = options.headers ? { ...defaultHeader, ...options.headers } : defaultHeader;

		//E. Si el usuario especifica un body (viene), entonces se hara un nuevo objeto con el body del usuario y el default. En caso contrario, se harta false. El objeto body viene en formato JSON, entonces lo convertimos (stringify) a string.
		options.body = JSON.stringify(options.body) || false;
		//E.1. Validacion de options.body. Si el valor de options.body es false, entonces borramos esa propiedad del objeto options.body.
		if (!options.body) delete options.body;
		//E.2. Por lo general, si hacemos una peticion GET no necesitamos body, pero no podemos mandar dentro de options.body un objeto vacio o falso.

		//console.log(options);
		//F. Para que se active el controller, y no quede ciclada la peticion fetch haremos uso de un setTimeout. Si despues de 3 seg no se recibe respuesta, se cancela la peticion. Esto genera la opcion del catch de la peticion fetch.
		setTimeout(() => controller.abort(), 3000);
		//TODO: Estas vendrian siendo las opciones que recibe nuestra peticion fetch.

		/* 3. Consulta Fetch. la Url esta definica en endpoint y options seran las opciones que el usuario pase. Se retorna una promesa. */
		return (
			fetch(endpoint, options)
				//3.1 Si la resp.ok es true, parseamos la res.json() y retornamos el resultado, de lo contrario rechazamos la promesa. Creamos una respuesta para el objeto del error (Promise.reject).
				.then(res =>
					res.ok
						? res.json()
						: Promise.reject({  //Este es el objeto del error.
								//3.2 Peticion AJAX: si err es verdadero, el status se toma de la respuesta (res) y en caso de que API no de status, seria "00" (la api no da status). tambien si statusText se tomaria de la respuesta (res) y si no manda nada da un mensaje de "Errorcito".
								err: true,
								status: res.status || '00',
								statusText: res.statusText || 'Ocurrió un error'
						  })
				)
				.catch(err => err)
		);
	}; //FIXME: Fin del customFetch del helper.

	//4. TODO: Uso de CustomFetch en los metodos.
	//1.1.get para obtener datos. Parametro url y Options; si no hay options (usamos metodo implicito), se pone un objeto vacio.
	const get = (url, options = {}) => customFetch(url, options);

	//1.2.post para crear datos. Parametro url y Options; si no hay options (usamos metodo implicito), se pone un objeto vacio.
	const post = (url, options = {}) => {
		//4.2. opctions al ser por defecto un objeto, le agregamos que el metodo sea POST.
		options.method = 'POST';
		return customFetch(url, options);
	};

	//1.3.put para actualizar datos.
	const put = (url, options = {}) => {
		//4.3. opctions al ser por defecto un objeto, le agregamos a opciones el metodo http "PUT" a ejecutar.
		options.method = 'PUT';
		return customFetch(url, options);
	};

	//1.4.delete para eliminar datos.
	const del = (url, options = {}) => {
		//4.4. opctions al ser por defecto un objeto, le agregamos a opciones el metodo http "DELETE" a ejecutar.
		options.method = 'DELETE';
		return customFetch(url, options);
	};

	return {
		get,
		post,
		put,
		del
	};
};
//FIXME: Fin del helper.
