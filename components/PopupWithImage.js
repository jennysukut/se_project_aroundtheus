import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector("#modal-image");
    this._description = this._popupElement.querySelector(
      "#card-image-modal-description"
    );
  }

  open(card) {
    this._image.src = card.link;
    this._image.alt = card.name;
    this._description.textContent = card.name;
    super.open();
  }
}

//Create one instance of this class in index.js and call its parent’s setEventListeners() method.
