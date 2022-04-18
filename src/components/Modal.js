//Este es el componente que se encarga de mostrar el modal.
import React from 'react';
import "../stylesheets/Modal.css";

const Modal = ({ children, isOpen, closeModal }) => { //1. desestructuramos la prop. children. La propiedad children hace referencia al contenido del componente Modal. Esta propiedad nos sirve especialmente cuando nuestros componentes puedan pasar prop. internamente y pasar contenido.
  const handleModalContainerClick = (e) => e.stopPropagation(); 
  //4. Funcion que se encarga de evitar que el usuario pueda cerrar el modal al hacer click en el contenedor del modal.

  return ( 
    //2. Elementos del DOM que se van a renderizar para el componente Modal.
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className='modal-container' onClick={handleModalContainerClick}>
        <button className='modal-close' onClick={closeModal}>X</button>
        {/*3. Children es el contenido que se va a renderizar dentro del componente Modal.*/}
        {children}  
      </div>
    </article>
  );
};

export default Modal;