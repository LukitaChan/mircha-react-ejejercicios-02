//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import ContactForm from './components/ContactForm'
import CrudApi from './components/CrudApi'
import CrudApp from './components/CrudApp'
import Modals from './components/Modals'
import SelectsAnidados from './components/SelectsAnidados'
import SongSearch from './components/SongSearch'

function App() {
	return (
		<>
			<h1>Ejercicios con React</h1>
      <hr />
      <Modals />
      <hr />
      <ContactForm />
      <hr />
      <SelectsAnidados />
      <hr />
      <SongSearch />
      <hr />
			<CrudApi />
			{/* Creamos una api falsa (api/db.json) en un json y la anexamos al package.json como dependencia (L23). La ejecutamos en el host.*/}
			<hr />
			<CrudApp />
		</>
	)
}

export default App
