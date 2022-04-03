import React, { useState, useEffect } from 'react';

  //4. variable de valor inicial para el estado del formulario.
  const initialForm ={
    id: null,
    name: '',
    constellation: '',
  }

  //9.1. Destructuramos las propiedades (CrudApp).
const CrudForm = ({createData, updateData, dataToEdit, setDataToEdit}) => {
  //3. creamos el estado inicial para el formulario. 
  //5. Agregamos el initialForm al useState.
  const [form, setForm] = useState(initialForm);

  //6. Regresando de CrudTableRow.jsx, generamos un efecto (useEffect) para que cuando se actualice (cambie) la variable de estado dataToEdit, se ejecute la funcion setForm.
  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
      } else {
        setForm(initialForm);
      }
    }, [dataToEdit]);


  //2. Como  los input estaran controlados por el estado (usuario), debemos inicializar los valores para manejar los eventos.
  //handleChange: es una funcion que se ejecuta cada vez que el usuario escribe en un input.
 const handleChange = (e) => {
   setForm({...form, [e.target.name]: e.target.value,});
   /* 7. cada vez que se escriba algo en un input, se actualizara el estado del formulario.*/
 }

 //handleSubmit: es una funcion que se ejecuta cada vez que el usuario presiona el boton de submit.
 const handleSubmit = (e) => {
   e.preventDefault(); //evita que se recargue la pagina.

   //8. hacemos referencia a las variables de estado que guarda esa variable de estado.
   if (!form.name || !form.constellation) {
     alert('Debes llenar todos los campos');
      return;
   }
    //9. creamos una condicion en caso de que el elemento traiga id:null, entonces se creara una nuevo registro.  si trae id:true, entonces se actualizara el registro.
   if(form.id === null) {
      createData(form);
   } else {
      updateData(form);
   }

   handleReset();
  };
    //10. limpiamos el formulario. Este esta controlado por la variable de estado form. Lo dejamos en su estado inicial (initialForm).
     //handleReset: es una funcion que se ejecuta cada vez que el usuario presiona el boton de reset.
  const handleReset =(e) => {
      setForm(initialForm);
      //11. Al resetear el formulario se actualiza el estado de la variable de estado dataToEdit a null.
      setDataToEdit(null);
    };


  return (
    <div>
      
      <h3>{dataToEdit ? "Editar Santo" : "Agregar Santo"}</h3>

      <form onSubmit={handleSubmit}>
        {/* 1.Creamos los elementos en muestra UI 
        6. los value adoptan la direccion por medio del initialForm*/}
        <input 
           
          type='text' 
          name='name' 
          value={form.name} 
          placeholder='Saint Name' onChange={handleChange}/>
        <input 
           
          type='text' 
          name='constellation' 
          value={form.constellation}  
          placeholder='Constelacion' onChange={handleChange}/>
        <input type='submit' value='Enviar Santo' />
        <input onClick={handleReset} type='reset' value='Limpiar' />
      </form>
    </div>
  );

};

export default CrudForm