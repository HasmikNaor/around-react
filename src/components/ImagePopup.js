import plus from '../images/plus.svg';

function ImagePopup(props) {
  const close = () => {
    props.onClose();
  }

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      close();
    }
  }
  const handleClickOnOverlayClose = (e) => {
    const classes = e.target.className;
    if (`popup popup_image popup_open` === classes) {
      close();
    }
  }
  return (
    <div className={`popup popup_image ` + (props.isOpen && 'popup_open')} onClick={handleClickOnOverlayClose} onKeyDown={handleEscClose} tabIndex="0">
      <figure className="popup__figure">
        <button className="popup__close-btn">
          <img src={plus} alt="close-image" className="popup__close-btn-img" onClick={props.onClose} />
        </button>
        <img alt={props.card.name} className="popup__image" src={props.card.link} />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  )
}
export default ImagePopup;