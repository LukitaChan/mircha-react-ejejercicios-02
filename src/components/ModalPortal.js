//Este es el componente que se encarga de mostrar el ModalPortal.
import React from 'react';
import ReactDOM from 'react-dom';
import "../stylesheets/Modal.css";

const ModalPortal = ({ children, isOpen, closeModal }) => { //1. desestructuramos la prop. children. La propiedad children hace referencia al contenido del componente Modal. Esta propiedad nos sirve especialmente cuando nuestros componentes puedan pasar prop. internamente y pasar contenido.
  const handleModalContainerClick = (e) => e.stopPropagation(); 
  //4. Funcion que se encarga de evitar que el usuario pueda cerrar el modal al hacer click en el contenedor del modal.

  //2. Elementos del DOM que se van a renderizar para el componente Modal.
  return ReactDOM.createPortal(
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className='modal-container' onClick={handleModalContainerClick}>
        <button className='modal-close' onClick={closeModal}>X</button>
        {/*3. Children es el contenido que se va a renderizar dentro del componente Modal.*/}
        {children}  
      </div>
    </article>,
    document.getElementById('modal')
    //3. El portal se va a renderizar en el elemento con el id modal-root.
  );
};

export default ModalPortal;