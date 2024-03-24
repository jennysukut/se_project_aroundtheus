import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, confirmButtonSelector, handleDeleteCard) {
    super(popup);
    this._confirmButton = document.querySelector(confirmButtonSelector);
    this._handleDeleteCard = handleDeleteCard;
  }

  open(id, card) {
    super.open();
    this._cardId = id;
    this._cardElement = card;
    return this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleDeleteCard(this._cardId, this._cardElement);
      this.close();
      //this.handleRemoveCard();
    });
  }
}
