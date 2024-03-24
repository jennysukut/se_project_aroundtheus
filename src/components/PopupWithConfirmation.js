import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, confirmButtonSelector) {
    super(popup);
    this._confirmButton = document.querySelector(confirmButtonSelector);
  }

  handleConfirm() {
    console.log("You've said you want to delete the card!");
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this.handleConfirm);
  }
}
