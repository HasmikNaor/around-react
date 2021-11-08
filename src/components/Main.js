import plus from '../images/plus.svg';
import edit from '../images/edit.svg';
import { api } from '../utils/api';
import { useState, useEffect } from 'react';
import Card from './Card';
function Main(props) {
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUser({
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar
        })
      }
      )
      .catch((error) => console.log(error))

    api.getInitialCards()
      .then(res => {
        setCards(res.map(card => (
          <Card onCardClick={props.onCardClick} card={card} key={card._id} />
        ))
        )
      }
      )
      .catch((error) => console.log(error))
  }, [])
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__image-container" onClick={props.onEditAvatarClick}>
            <img src={user.userAvatar} alt="profile" className="profile__image" />
          </div>
          <div className="profile__details">
            <div className="profile__title">
              <h1 className="profile__name">{user.userName}</h1>
              <button className="profile__edit-btn" type="button" onClick={props.onEditProfileClick} >
                <img src={edit} alt="edit-image" className="profile__edit-image" />
              </button>
            </div>
            <p className="profile__subtitle">{user.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlaceClick}>
          <img src={plus} alt="plus-image" className="profile__plus-image" />
        </button>
      </section>
      <section className="places">{cards}</section>
    </main>
  )
}
export default Main;