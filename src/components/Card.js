import trash from '../images/trash.svg';

function Card(props) {
  const handleClick = () => {
    props.onCardClick(props.card);
  }
  return (
    <>
      <figure className="places__place " onClick={handleClick}>
        <button type="button" className="trash-btn">
          <img src={trash} alt="trash" className="trash-img" />
        </button>
        <img alt={props.card.name} className="places__image" src={props.card.link} />
        <figcaption className="places__caption">
          <h2 className="places__title">{props.card.name}</h2>
          <button type="button" className="places__btn"></button>
          <span className="card__likes-count">{props.card.likes.length}</span>
        </figcaption>
      </figure>
    </>
  )
}
export default Card;