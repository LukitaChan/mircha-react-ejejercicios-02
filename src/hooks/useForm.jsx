//Hook para ContactForm.jsx. Este hook hace uso de la logica que va a usar el formulario de contacto.
import {useState} from 'react';
import { helpHttp } from '../helpers/helpHTTP';

export const useForm = (initialForm, validateForm) => { 
  //Aplicamos un valor inicial para el estado del formulario como parametro.
  //0. initial form: es un objeto que contiene los valores iniciales del formulario. validateForm: es una funcion que valida los datos del formulario. En el handleBlur (cuando pierde el foco del input) cuando se desencadenan las validaciones del useForm se llama a la funcion validateForm.
  
  
  //1. Declaramos las variables de estado del formulario.
  const [form, setForm] = useState(initialForm);    //1.1. VE del formulario.
  const [errors, setErrors] = useState({});         //1.2. VE del error.
  const [loading, setLoading] = useState(false);    //1.3. VE del cargado.
  const [response, setResponse] = useState(null);    //1.4. VE del respuesta; para mostrar el mensaje de exito de enviado el formulario.

  //2. Variables de estado (funciones) para los elementos jsx que se ejecutaran en los eventos; cambio de valores (handleChange), envio del formulario (handleSubmit) y las validaciones se van a lanzar cuando se puerda el foco (focus) el elemento del formulario (handleBlur).
  //2.1. handleChange genera una copia del formulario (form) y le agrega el valor del input que se esta escribiendo (e.target.value). Este se ejecuta en el onChange y esta ligado al value de los inputs: genera formularios controlados por el estado.
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  //2.3. Cuando los elementos del form pierdan el foco de la page; se actualizaria el estado nuevamente por el handleChange y la variable de errores (errors) generaria los mensajes correspondientes de error. Creariamos el form, lo actualizariamos (handleChange)y lanzariamos los errores actualizados (setErrors).
  const handleBlur = (e) => {
    handleChange(e);
    //2.4. setErrors tomaria las validaciones (validateForm) y validaria cada una de las variables dentro del input. vamos a ContactForm.jsx. en 2.
    setErrors(validateForm(form));
  };

  //4. La programacion del envio del formulario (handleSubmit).
  const handleSubmit = (e) => {
		//e.preventDefault() Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo
		e.preventDefault();
    //4.1. Validaremos de que no haya errores.
    setErrors(validateForm(form));
    //4.2. Lo ideal es que la variable de estado que referencia a los errores sea siempre a un objeto vacio. El método Object.keys() devuelve un array de las propiedades names de un objeto, en el mismo orden como se obtienen en un loop normal.
    //Si el objeto de errors no trae ninguna propiedad sera un array vacio (0) y mandara mensaje alert de "Enviando Formulario", caso contrario que NO ejecute.
    if(Object.keys(errors).length === 0){
      alert ('Enviando Formulario');
      //4.3. setLoading toma el valor true para que el formulario se muestre cargando usando un Loader.
      setLoading(true);
      //4.4. Ayudados por el helper Http (helpHttp) hacemos una peticion POST al servidor. helpHttp nos pide una url (endpoint) y las options (objeto) para mandar la data.
      helpHttp()
				.post("https://formsubmit.co/ajax/goldkardia@gmail.com", {
          body: form, //Objeto que contiene los datos del formulario.
          headers: {  //helpHttp L8. Configuramos las cabeceras de la peticion.
            "Content-Type": "application/json", 
            Accept: "application/json"
          }
        })  //4.5. helpHttp devuelve un objeto con la respuesta del servidor (todo ok o un error).
				.then((res) => {
          setLoading(false);  //setLoading regresa a false para ocultar el Loader.
          setResponse(true);  //setResponse pasa a ser verdadero, quiere decir que el formulario se envio correctamente.
          setForm(initialForm)//Para resetear el form luego de enviar el formulario.
          setTimeout(() => setResponse(false), 5000); //setTimeout para que el mensaje de exito desaparezca despues de 5 segundos de que se haya mandado el form y tengamos la respuesta de exito (opcional, ContactForm L135).
        });
    } else {return;}
	};

  //3. Retornamos un objeto con las variables de estado del formulario.
  return {form, errors, loading, response, handleChange, handleBlur, handleSubmit};
};

//0, 1, 2 y 3 son los parametros y la logica que se retornan en el hook.
