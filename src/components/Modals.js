//Aqui irian los ejercicios.
import React from 'react';
import Modal from './Modal';
import { useModal } from '../hooks/useModal';
import ContactForm from './ContactForm';
import SongSearch from './SongSearch';
import ModalPortal from './ModalPortal';

const Modals = () => {
  //1. Mandamos llamar al hook y destructuramos sus valores como array.
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  //1.1. Al llamar al hook con sus valores de return PERO personalizados para ese modal: isOpenModal1, , se le asigna al modal 1. Asi sucesivamente para cada Modal.
  const [isOpenModal2, openModal2, closeModal2] = useModal(false);
  const [isOpenModal3, openModal3, closeModal3] = useModal(false);
  const [isOpenContact, openModalContact, closeModalContact] = useModal(false);
  const [isOpenSong, openModalSong, closeModalSong] = useModal(false);

  const [isOpenPortal, openModalPortal, closeModalPortal] = useModal(false); //Portales.

  return (
		<div>
			<h2>Modales</h2>
			{/* LOGICA: Para activar y desactivas los ejercicios de las ventanas modales */}
			<button onClick={openModal1}>Modal 1</button>
			{/* LOGICA: El componente Modal.js */}
			<Modal isOpen={isOpenModal1} closeModal={closeModal1}>
				<h3>Modal 1</h3>
				<p>Este es el contenido de mi modal 1</p>
				<img
					src='https://scontent.fmid2-1.fna.fbcdn.net/v/t39.30808-6/273565397_5542086089152430_2808315852343965738_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=174925&_nc_ohc=f_gnLXAeMvMAX-6GJhs&tn=HSZpcmVleKl8dGD1&_nc_ht=scontent.fmid2-1.fna&oh=00_AT-4RaPTsRBNbufvPXG8xOyv1KbY_3GSP6h3wC4ohCjlcw&oe=625C7F54'
					alt='SnowMiku'
					width={250}
				/>
			</Modal>

			<button onClick={openModal2}>Modal 2</button>
			<Modal isOpen={isOpenModal2} closeModal={closeModal2}>
				<h3>Modal 2</h3>
				<p>Este es el contenido de mi modal 2</p>
				<img
					src='https://scontent.fmid2-1.fna.fbcdn.net/v/t39.30808-6/260121669_5253355061358869_5058347985498936505_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=fmUxk5_9DokAX-sNug1&_nc_ht=scontent.fmid2-1.fna&oh=00_AT8qVhfjfM0ejs_t2zRorBxsP992iB-6tkhLaPH_qvIM3g&oe=625E6882'
					alt='DMG y Yami'
					width={250}
				/>
			</Modal>

			<button onClick={openModal3}>Modal 3</button>
			<Modal isOpen={isOpenModal3} closeModal={closeModal3}>
				<h3>Modal 3</h3>
				<p>Este es el contenido de mi modal 3</p>
				<img
					src='https://scontent.fmid2-1.fna.fbcdn.net/v/t1.6435-9/154454516_4425695444124839_3930221096368602108_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=174925&_nc_ohc=QQzh23-y-5sAX-32Au0&tn=HSZpcmVleKl8dGD1&_nc_ht=scontent.fmid2-1.fna&oh=00_AT8pAnsr-Im34Uz-r6Ak6zqBtZFm-jGxjDtyLMn044V9ug&oe=627E586D'
					alt='Dark Elise'
					width={250}
				/>
			</Modal>

			<button onClick={openModalContact}>Formulario</button>
			<Modal isOpen={isOpenContact} closeModal={closeModalContact}>
				<ContactForm />
			</Modal>

			<button onClick={openModalSong}>SongSearch</button>
			<Modal isOpen={isOpenSong} closeModal={closeModalSong}>
				<SongSearch />
			</Modal>

			{/* Portales */}
			<button onClick={openModalPortal}>Modal en Portal</button>
			<ModalPortal isOpen={isOpenPortal} closeModal={closeModalPortal}>
				<h3>Modal en Portal</h3>
				<p>Este es el contenido de un modal que carga en otro nodo del DOM diferente a donde carga nuestra app de React, gracias a un react portal.</p>
				<img
					src='https://scontent.fmid2-1.fna.fbcdn.net/v/t39.30808-6/277755188_5701670866527284_2203859788017450218_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=7Yb3ixdz3vAAX9t3ldv&_nc_ht=scontent.fmid2-1.fna&oh=00_AT_RVDWJVrKeQcJpQe_xXKpqfPJf77OrnDIUFHwRTBAK4g&oe=625D6B08'
					alt='Alpaca Suri'
					width={250}
				/>
			</ModalPortal>
		</div>
	);
}

export default Modals;