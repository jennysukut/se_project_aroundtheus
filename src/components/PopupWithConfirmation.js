import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, submitButton) {
    super(popup);
    this._confirmButton = document.querySelector(submitButton);
    this._submitButton = document.querySelector(submitButton);
  }

  setEventListeners(processingMessage) {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleExecute();
      this.setProcessingMessage(processingMessage);
    });
  }

  setSubmitAction(action) {
    this._handleExecute = action;
  }

  setProcessingMessage(text) {
    this._submitButton.textContent = text;
  }

  removeProcessingMessage(text) {
    this._submitButton.textContent = text;
  }
}
