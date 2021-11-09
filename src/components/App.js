import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    link: '',
    name: '',
    id: ''
  });

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard({
      link: card.link,
      name: card.name,
      id: card._id
    })
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onEditAvatarClick={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />

        <PopupWithForm name='edit-profile' title='Edit Profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input id="name-input" type="text" className="popup__input popup__input_edit-profile_name"
            placeholder="Name" required minLength="2" maxLength="40" name="name" />
          <span id="name-input-error" className="popup__error"></span>
          <input id="job-input" type="text" className="popup__input popup__input_edit-profile_about"
            placeholder="Proffesion" required minLength="2" maxLength="200" name="job" />
          <span id="job-input-error" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm name='add-new-place' title='New Place' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input id="card-name-input" type="text" className="popup__input popup__input_new-place_title"
            placeholder="Title" required minLength="1" maxLength="30" name="name" />
          <span id="card-name-input-error" className="popup__error"></span>
          <input id="card-link-input" type="url" className="popup__input popup__input_new-place_url"
            placeholder="Image url" required name="link" />
          <span id="card-link-input-error" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm name='type_edit-avatar' title='Change profile picture' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
          <input id="avatar-link-input" type="url" className="popup__input" placeholder="Image url" required
            name="link" />
          <span id="avatar-link-input-error" className="popup__error"></span>
        </PopupWithForm>

        <PopupWithForm name='type_delete-card' title='Are you sure' onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
      </div>
    </div>
  );
}
export default App;
