import React from 'react'
import Message from './Message';
import SongArtist from './SongArtist';
import SongLyric from './SongLyric';

//1. Desestructuracion de props. search, lyric, bio:
const SongDetails = ({search, lyric, bio}) => {
  /* En este caso, SongDetails se retroalimenta de otros 2 componentes: SongArtist para el Artista y SongLyric para la letra de la cancion. */

  //2. para evitar renderizados incesesarios, creamos una condicional render: Mientras lyric y bio no tengan informacion, no se pintara nada. Cuando tengan datos haran el return del cuerpo del componente.
  if (!lyric || !bio) return null; //lyric = song y bio = artist.
  return (
		<>
			{/* 3.1. conditional render: Cuando ejecutamos un abort controller a una peticion fetch, la respuesta que manda fetch en el error sera una propiedad .name que sera igual a la palabra "AbortError". 
      Si hay error y la prop. es AbortError, se pintara el message de error, de lo contrario (hay respuesta) se imprime la cancion.
      Anexo: incluimos el lyric.err (del helper, L43) sea true en la condicion */}
			{lyric.error || lyric.err || lyric.name === 'AbortError' 
      ? (<Message 
        msg={`Error: no existe la cancion "${search.song}"`} //search.song = titulo de la cancion.
        bgColor="#dc3545" />) 
      //Message recibe dos props: msg y bgColor.
      //4. al componente SongLyric le pasamos las propiedades que declaramos para su componente: el titulo de la cancion y la letra de la cancion (title y lyrics). En el caso de lyrics viene de la prop. lyric y en la api de la cancion viene de la prop. lyric.lyrics.
      : (<SongLyric title={search.song} lyrics={lyric.lyrics} />)}

			{/* 3.2. conditional render: bio viene en forma de objeto, con la caracteristica "artists". cuando bio.artist NO sea null (que exista) entonces que muestre al artista, caso contrario marcara mensaje de error. */}
			{bio.artists 
      //5. al componente SongArtist le pasamos las propiedades que declaramos para su componente: el nombre del artista y la informacion del artista (name y artist). En el caso de artist viene de la prop. bio.artists para artist en la api (array). 
      ? (<SongArtist artist={bio.artists[0]} />)
      : (<Message 
        msg={`Error: no existe el interprete "${search.artist}"`} 
        bgColor="#dc3545"/>)}
		</>
	);
} //Falta pasar las propiedades lyric a SongLyric y bio a SongArtist.

export default SongDetails;