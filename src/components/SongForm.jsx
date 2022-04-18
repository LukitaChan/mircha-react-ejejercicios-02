import React, { useState } from 'react';

//2.1. Propiedades del initialForm:
const initialForm = {
  artist: '',
  song: '',
};


//1. Desestructuracion de su prop. handleSearch:
const SongForm = ({handleSearch}) => {
  //2. Lo ideal es tener los formularios controlados a partir de una variable de estado.
  const [form, setForm] = useState(initialForm);

  //2.2. Asignamos la propiedad value (variable de estado form.artist y sorm.song) y el evento onChange a los input text del formulario:
  const handleChange = (e) => {
    //2.3. En el evento handleChange (onChange), vamos a actualizar la variable de estado form.
    setForm({
      //La funcion setForm tomara una copia del objeto formulario (form) y lo combinara con lo que se extraiga del evento: e.target es el objeto que modifica el evento y .name es el nombre del input que nos espesificara si es artist o song.
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //3. Creamos el evento handleSubmit para el formulario:
const handleSubmit = (e) => {
	//3.1. Prevenimos el enviado del formulario por que lo controlaremos con React y lo asignamos al formulario.
	e.preventDefault();

	//3.2 Condicinales para validar el formulario: Si artist y song estan vacios...
	if (!form.artist || !form.song) {
		alert('Amigo, coloca los datos del artista y cancion');
		return;
	}

	//3.3. En caso de ser false (que si haya datos), enviar los datos del formulario a la funcion handleSearch.
	handleSearch(form);
	//3.4. Como el formulario ya se estaria procesando, habria que limpiarlo. Lo regresamos a su data inicial.
	setForm(initialForm);
};

  return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='artist'
					placeholder='Nombre del Artista'
					onChange={handleChange} //Evento onChange
					value={form.artist}     //Variable de estado form.artist
				/>
				<input
					type='text'
					name='song'
					placeholder='Nombre del Cancion'
					onChange={handleChange} //Evento onChange
					value={form.song}       //Variable de estado form.song
				/>
				<input type='submit' value='Enviar' onChange={handleSearch}/>
			</form>
		</div>
	);
}

export default SongForm