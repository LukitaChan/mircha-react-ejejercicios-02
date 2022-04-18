import React from 'react';
import { useForm } from "../hooks/useForm";
import Loader from './Loader';
import Message from './Message';

//1. initialForm del formulario:
const initialForm = {
  name:"",
  email:"",
  subject:"",
  comments:"",
}

//2. Variable que validara las ejecuciones del formulario. Esta funcion recibira los datos del formulario (form) y ejecutara la programacion que se desee (handleBlur).
const validationsForm = form => {
	//2.1. Definimos un objeto que contendra los errores. Este objeto pasara por todas las validaciones y si sigue vacio no habria errores. Por cada nuevo error se agregara una propiedad al objeto errors.
	let errors = {}; //por cada mensaje de error se asocia a input que genera el error.
	//2.3. Validaciones con el uso de expresiones regulares (regex).
	let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
	let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
	let regexComments = /^.{1,255}$/;

	//2.2. Validamos el campo name: si no se llena el campo name (vacio) se agregara un error.
	//2.4. Por cada input nuevo se deberia iniciar una cadena de if anidados (por input) nueva por que se necesita que la funcion validadora entre a todos los inputs.
	//2.5. La siguiente validacion (else if) seria en relacion a las expreciones regulares. El método test() ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
	if (!form.name.trim()) {
		errors.name = "El campo 'Nombre' es requerido";
	} else if (!regexName.test(form.name.trim())) {
		errors.name = "El campo 'Nombre' no es válido";
	}

	if (!form.email.trim()) {
		errors.email = "El campo 'Email' es requerido";
	} else if (!regexEmail.test(form.email.trim())) {
		errors.email = "El campo 'Email' no es válido";
	}

	if (!form.subject.trim()) {
		errors.subject = "El campo 'Asunto' es requerido";
	}

	if (!form.comments.trim()) {
		errors.comments = "El campo 'Comentarios' es requerido";
	} else if (!regexComments.test(form.comments.trim())) {
		errors.comments = "El campo 'Comentarios' no debe contener más de 255 caracteres";
	}

	return errors;
}; //fin validacionesForm.

//5. Variable para estilos personalizados de las condicionales.
let styles = {
  fontWeight: "bold",
  color: "#dc3545",
  backgroundColor: "#f8d7da",
  textAlign: "center",
}


const ContactForm = () => {
//0. Desestructuramos los parametros del hook que son retornados del useForm. el validationsForm.
const { 
  form, 
  errors, 
  loading, 
  response, 
  handleChange, 
  handleBlur, 
  handleSubmit 
} = useForm(initialForm, validationsForm);

  return (
		//3. Definiremos los elementos jsx que se ejecutaran en los eventos.
		//4. Manupulacion de errores: entre los input manejaremos conditional renders.
		<div id='formulario'>
			<h3>Formulario de Contacto</h3>
			<form onSubmit={handleSubmit}>
				<input //3.1. input de name.
					type='text'
					name='name'
					value={form.name}
					placeholder='Escribe tu name'
					onChange={handleChange}
					onBlur={handleBlur}
					required
				/>

				{errors.name && <p style={styles}>{errors.name}</p>}

				<input //3.2. input de email.
					type='email'
					name='email'
					value={form.email}
					placeholder='Escribe tu email'
					onChange={handleChange}
					onBlur={handleBlur}
					required
				/>

				{errors.email && <p style={styles}>{errors.email}</p>}

				<input //3.3. input de texto.
					type='text'
					name='subject'
					value={form.subject}
					placeholder='Asunto a tratar'
					onChange={handleChange}
					onBlur={handleBlur}
					required
				/>

				{errors.subject && <p style={styles}>{errors.subject}</p>}

				<textarea //3.4. input de comentarios.
					name='comments'
					value={form.comments}
					cols='50'
					rows='5'
					placeholder='Escribe tus comentarios'
					onChange={handleChange}
					onBlur={handleBlur}
					required></textarea>

				{errors.comments && <p style={styles}>{errors.comments}</p>}

				<input //3.5. input de enviar (submit).
					type='submit'
					value='Enviar'
				/>
			</form>

      {/* 6. Haremos visible en la UI que el mensaje haya sido enviado. Como loading cambia de true/false dependiendo de si se hace la peticion o se nos da respuesta: si loading:true (tiempo d eespera activo) entonces carga el Loader. */}
      {loading && (<Loader />)}

      {/* 7. Cuando la respuesta llega manda response:true; entonces podemos notificar a la UI con un mensaje de que el form fue enviado y se recibio la data.*/}
      {response && (<Message msg="El formulario fue enviado" bgColor="#198754" />)}

		</div>
		//3.0.5. Como las validaciones se haran cuando se pierda el foco de la pagina (input) se le asigna una funcion (handleBlur) que se ejecutara en el evento onBlur.
	);
};

export default ContactForm;