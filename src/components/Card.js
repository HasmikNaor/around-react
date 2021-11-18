import trashIcon from '../images/trash.svg';
import currentUser from '../contexts/CurrentUserContext'
import { useContext, useState } from 'react';

function Card(props) {
  const user = useContext(currentUser);
  const isOwn = props.card.owner._id === currentUser._id;

  const [isLiked, setIsLiked] = useState(props.card.likes.some(i => i._id === currentUser._id));
  const cardLikeButtonClassName = isLiked ? 'places__btn_active' : '';

  const handleClick = () => {
    props.onCardClick(props.card);
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card, isLiked)
    setIsLiked(!isLiked);
  }

  const handleDeleteClick = () => {
    props.onCardDelete(props.card, isOwn)
  }
  return (
    <>
      <figure className="places__place " >
        <button type="button" className="trash-btn" onClick={handleDeleteClick}>
          {isOwn && <img src={trashIcon} alt="trash" className="trash-img" />}
        </button>
        <img alt={props.card.name} className="places__image" src={props.card.link} onClick={handleClick} />
        <figcaption className="places__caption">
          <h2 className="places__title">{props.card.name}</h2>
          <button type="button" className={`places__btn ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
          <span className="card__likes-count">{props.card.likes.length}</span>
        </figcaption>
      </figure>
    </>
  )
}

export default Card;