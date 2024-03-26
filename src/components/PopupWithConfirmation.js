import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, submitButton) {
    super(popup, submitButton);
    this._confirmButton = document.querySelector(submitButton);
  }

  open() {
    super.open();
  }

  setEventListeners(processingMessage) {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleExecute();
      this.setProcessingMessage(processingMessage);
      this.close();
    });
  }

  setSubmitAction(action) {
    this._handleExecute = action;
  }
}
