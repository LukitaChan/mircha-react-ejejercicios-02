import React from 'react'

//1. Desestructuracion de props. artist. que viene de songDetails. Las propiedades vienen del array de artists de la api. artist={bio.artists[0]}.
const SongArtist = ({ artist }) => {
  return (
		<section>
			<h4>{artist.strArtist}</h4> {/* Nombre del Artista */}
			<img src={artist.strArtistThumb} alt={artist.strArtist} /> {/* Imagen */}
			<p>
				{artist.intBornYear} - {artist.intDiedYear || 'Presente'}
			</p>
			{/* nacimiento. En este caso hacemos un condicional en caso de estar vivo o muerto */}
			<p>{artist.strCountry}</p> {/* nacionalidad */}
			<p>
				{artist.strGenre} - {artist.strStyle}
			</p>{' '}
			{/* genero musical y estilo del artista*/}
			<a href={`http://${artist.strWebsite}`} target="_blank" rel="noreferrer" > Sitio Web Oficial</a>
			{/* website. en este caso para que agregue el http hacemos el uso de template string */}
      <p>{artist.strBiographyEN}</p>
		</section>
	);
}; //Fin del componente SongArtist.

export default SongArtist