import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
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
