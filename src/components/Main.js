import plusIcon from '../images/plus.svg';
import edit from '../images/edit.svg';
import { useContext } from 'react';
import Card from './Card';
import currentUser from '../contexts/CurrentUserContext';

function Main(props) {
  const user = useContext(currentUser)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__image-container" onClick={props.onEditAvatarClick}>
            <img src={user.avatar} alt="profile" className="profile__image" />
          </div>
          <div className="profile__details">
            <div className="profile__title">
              <h1 className="profile__name">{user.name}</h1>
              <button className="profile__edit-btn" type="button" onClick={props.onEditProfileClick} >
                <img src={edit} alt="edit-image" className="profile__edit-image" />
              </button>
            </div>
            <p className="profile__subtitle">{user.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlaceClick}>
          <img src={plusIcon} alt="plus-image" className="profile__plus-image" />
        </button>
      </section>
      <section className="places">{props.cards.map(card => (
        <Card onCardClick={props.onCardClick} card={card} key={card._id} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
      ))}

      </section>
    </main>
  )
}

export default Main;