//Hook que almacenara la logica para Modal.js
import { useState } from 'react';

//2. Hook que se encarga de manejar el modal. Valor inicial de la variable modalState sera false en caso de que el usuario no asigne (ocultados).
export const useModal = (initialValue = false) => {
	//1. Variable de estado para saber si el modal esta abierto o no.
	const [isOpen, setIsOpen] = useState(initialValue);

	//3. Funcion que se encarga de abrir el modal.
	const openModal = () => {
		setIsOpen(true);
	};

	//4. Funcion que se encarga de cerrar el modal.
	const closeModal = () => {
		setIsOpen(false);
	};

  return [isOpen, openModal, closeModal]; 
  //5. Retornamos el estado del modal, la funcion para abrir el modal y la funcion para cerrar el modal a manera de array.
}; 
//Fin del Hook. Se ejecutan en el componente Modals.js por que para controlar cada  Modal se necesita un Hook.
