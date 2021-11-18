import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContexts';

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
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((error) => console.log(error))

    api.getInitialCards()
      .then(res => {
        setCards(res)
      }
      )
      .catch((error) => console.log(error))
  }, [])

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

  const handleUpdateUser = ({ name, about }) => {
    api.setUserData(name, about)
      .then((res) => setCurrentUser(res))
      .catch(error => console.log(error))
  }

  const handleUpdateAvatar = ({ avatar }) => {
    api.updateAvatar(avatar)
      .then((res) => setCurrentUser(res))
      .catch(error => console.log(error))
  }

  const handleAddPlaceSubmit = (data) => {
    api.createCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch(error => console.log(error))
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  const handleCardDelete = (card, isOwn) => {
    if (isOwn)
      api.deleteCard(card._id)
        .then(() => setCards(cards => cards.filter(c => c._id !== card._id)))
  }

  const handleCardLike = (card, isLiked) => {
    if (isLiked)
      api.deleteLike(card._id)
        .then((newCard) => setCards(cards => cards.map(c => c._id === card._id ? newCard : c)
        )
        )
        .catch((error) => console.log(error))
    else
      api.addLike(card._id)
        .then((newCard) => setCards(cards => cards.map(c => c._id === card._id ? newCard : c)
        ))
        .catch((error) => console.log(error))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />

          <Main onEditProfileClick={handleEditProfileClick} onAddPlaceClick={handleAddPlaceClick} onEditAvatarClick={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />

          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm name='type_delete-card' title='Are you sure' onClose={closeAllPopups} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
