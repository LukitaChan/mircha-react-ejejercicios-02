import React, { useState, useEffect } from 'react';
import { helpHttp } from '../helpers/helpHTTP';
import Loader from './Loader';
import SongDetails from './SongDetails';
import SongForm from './SongForm';
//Curso react video 37-41. Este es el componente principal.

/* Necesitamos el formulario (songForm), el detalle de la cancion y el artista (SongDetails)*/
/*
- Necesitamos una variable de estado que nos almacene la busqueda
- Tambien una variable de estado que guarde la informacion del artista (biography).
- Una variable de estado que nos guarde la informacion de la cancion (lyric).
- Otra variable de estado: al hacer la peticion se recomienda el loader.
*/

//1. definimos las variables de estado:
const SongSearch = () => {
  //1.1. Creamos una variable de estado que almacene la busqueda.
  const [search, setSearch] = useState(null);
  //1.2. Creamos una variable de estado que almacene la informacion de la cancion.
  const [lyric, setLyric] = useState(null);
  //1.3. Creamos una variable de estado que almacene la informacion del artista.
  const [bio, setBio] = useState(null);
  //1.4. Creamos una variable de estado que almacene el loader.
  const [loading, setLoading] = useState(false);

  //3. Las variables asincronas las debemos trabajar en un useEffect. El useEffect se ejecuta cuando el componente se monta, es decir cuando search cambie. Haremos uso del helpHttp para hacer la peticion.
  useEffect(() => {
    //3.1. El efecto va a esperar las respuestas de las 2 api (lyric y bio). Para evitar renderizados innecesarios, creamos una condicion.
    if (search === null) return;   //Para salir del efecto.

    //3.2. Creamos una funcion que se ejecute cuando search cambie. search tendra dos valores (artist y song). Dentro de la funcion async fetchData destructuramos los valores de search.
      const fetchData = async () => {
				const { artist, song } = search;

				//3.3. Creamos las variables endPoint y url para artist y song. Hacemos uso de template strings.
				let artistUrl = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
				let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

				//console.log(artistUrl, songUrl);
				//Se necesita tener la info de ambas partes para hacer la UI, usaremos el metodo ALL del constructor promise de javascript para esperar ambas peticiones, y hasta que ambas se resuelvan entonces se ejecuta el pintado en la UI.
				/* El método Promise.all(iterable) devuelve una promesa que termina correctamente cuando todas las promesas en el argumento iterable han sido concluídas con éxito, o bien rechaza la petición con el motivo pasado por la primera promesa que es rechazada. */

				//4. Hacemos uso del loader debido a la espera la respuesta de las peticiones a las APIs. Pasa de iniciar en false a true.
				setLoading(true);
				//4.2. Aqui iria el await de la peticion de la API. El metodo all crea un arreglo con todas las peticiones fetch que se quieran hacer: respuesta del artista (artistRes) y respuesta de la cancion (songRes).
        //4.3. Con Promise.all hacemos la consulta de la data usando el helper y el metodo get() con el endPoint guardado en artistUrl.
        const [artistRes, songRes] = 
          await Promise.all([
            helpHttp().get(artistUrl),       //artistRes
            helpHttp().get(songUrl)          //songRes
          ]);

          //console.log(artistRes, songRes);   //respuesta en formato json.

          //4.4. Asignamos a cada dato actualizado del state la respuesta de la API.
          setBio(artistRes);
          setLyric(songRes);

				//4.1. Cuando se termine la consulta de la data volvera a su estado por defecto, false.
				setLoading(false);
			}; /* Fin de la peticion, sigue el renderizado. */

      fetchData();

  } , [search]);  

  
  //2.2.Vamos a crear el metodo que nos permita manejar el submit del formulario pero que el formulario pase los datos (data) a la variable de estado search. LA variable handleSubmit es una funcion que pasara como prop a SongForm.
  const handleSearch = (data) => {
    //console.log(data);
    //2.3. En la variable de estado search, vamos a guardar la busqueda.
    setSearch(data);
  }

  return (
		<div>
			<h2>Song Search</h2>
			<article className='grid-1-3'>
				{/* 2. Importamos el componente SongForm y SongDetails*/}
				<SongForm handleSearch={handleSearch} />
				{/* 2.1. Usaremos el loader que habiamos hecho para la CrudApi. Nos apoyaremos en un conditional render para que el Loader no este activo todo el tiempo.*/}
				{loading && <Loader />}
				{/*5. Los details se mostraran hasta que haya respuesta. Implementaremos un conditional render para el componente principal SongSearch  */}
				{/*5.1. Conditional render: Si la busqueda no es nula (true) y loading sea falso entonces renderiza SongDetails*/}
				{search && !loading && <SongDetails search={search} lyric={lyric} bio={bio} />}
				{/* En este caso, SongDetails se retroalimenta de otros 2 componentes: SongArtist para el Artista y SongLyric para la letra de la cancion. */}
				{/*2.3. en SongDetails, una vez que se haga la busqueda los datos de la biografia y letra (con sus respectivas variables de estado) se pasaran a los componentes SongDetails. */}
			</article>
		</div>
	);
}

export default SongSearch;