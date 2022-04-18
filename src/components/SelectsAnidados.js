//Video 42, 43 y 44 React.
import React, { useState } from 'react';
import SelectList from './SelectList';


//1. Creamos el componente para los select de la lista.
const SelectsAnidados = () => {
  //2. Crearemos  un hook personalizado; un ude-fetch que nos permita guardar en el estado una variable de estado (useState).
  const [estado, setEstado] = useState("");   // VE. para los Estados de la republica.
  const [town, setTown] = useState("");       // VE. para los Municipios de los Estados de la republica.
  const [suburb, setSuburb] = useState("");   // VE. para los Barrios/Colonias de los Municipios de los Estados de la republica.

  // 4. Hacemos una variable para el token de la url de la api. (esto es opcional para este ejemplo)
  const TOKEN = '03811934-3648-41ef-91b8-942384e7dda2';

  
  //Hacemos uso de un conditional render para mostrar los select de acuerdo al estado seleccionado.
  return (
		<div>
			<h2>Selects Anidados</h2>
			<h3>México</h3> {/* Llamamos la componente SelectList.js, 1 por cada variable de estado. */}
			{/* 3. Definiremos las props. que le pasaremos al SelectList: 
      - title. La label hara referencia la texto ce su select (Estado, Municipio, Colonia).
      - Tambien la url del endpoint donde se hara la solicitud de la api de consulta.
      - Una funcion donde se detecte el cambio del valor select html; handleChange el cual disparara el evento, permitiendo el cambio de cada variable.*/}
			<SelectList
				title='estado'
				url=''
				//url={`https://api.copomex.com/query/get_estados?token=${TOKEN}`} //4.
				handleChange={e => {
					setEstado(e.target.value);
				}}
			/>
			{/* El primer select (estados) debera cargar de inicio, pero no sera necesario cargar los otros dos estados (municipios y colonias) hasta que este renderizado el primero. Creamos un conditional render.*/}
			{estado && (
				<SelectList
					title='municipios'
					url=''
					//url={`https://api.copomex.com/query/get_municipio_por_estado/${estado}?token=${TOKEN}`}
					handleChange={e => {
						setTown(e.target.value);
					}}
				/>
			)}
			{town && (
				<SelectList
					title='colonia'
					url=''
					//url={`https://api.copomex.com/query/get_colonia_por_municipio/${town}?token=${TOKEN}`}
					handleChange={e => {
						setSuburb(e.target.value);
					}}
				/>
			)}
			<pre>
				<code>
					{estado} - {town} - {suburb}
				</code>
			</pre>
		</div>
	);
};

export default SelectsAnidados
