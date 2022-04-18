import React from 'react'

//1. Destructuramos props. que pasaran al componente: title y lyrics (songDetails) y los colocamos en donde se mostraran en la UI.
const SongLyric = ({ title, lyrics }) => {
  return (
		<section>
			<h4>{title.toUpperCase()}</h4> {/* titulo de la cancion */}
			{/* Para que se marquen los enters con el whiteSpace. */}
			<blockquote style={{ whiteSpace: 'pre-wrap' }}>{lyrics}</blockquote> {/* Letra de la Cancion */}
		</section>
	);
} //Fin de SongLyric.

export default SongLyric