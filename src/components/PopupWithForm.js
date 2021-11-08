import React from 'react';
import plus from '../images/plus.svg';
function PopupWithForm(props) {
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
    if (`popup popup_${props.name} popup_open` === classes) {
      close();
    }
  }

  return (
    <div className={`popup popup_${props.name} ` + (props.isOpen && 'popup_open')} onClick={handleClickOnOverlayClose} onKeyDown={handleEscClose} tabIndex="0">
      <div className="popup__content">
        <button className={`popup__close-btn popup__close-btn_${props.name}`} onClick={close}>
          <img src={plus} alt="close-btn" className="popup__close-btn-img" />
        </button>
        <form className={`popup__form popup__form_${props.name}`}>
          <h2 className={`popup__title popup__title_theme_${props.name}`}>{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save-btn" onClick={close}>Save</button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm;