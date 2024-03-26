import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, confirmButtonSelector) {
    super(popup);
    this._confirmButton = document.querySelector(confirmButtonSelector);
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleExecute();
      this.close();
    });
  }

  setSubmitAction(action) {
    this._handleExecute = action;
  }
}
