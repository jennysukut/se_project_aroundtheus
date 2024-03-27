import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popup, submitButton) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = document.querySelector(submitButton);
  }

  _getInputValues() {
    this._formInputs = Array.from(
      this._popupElement.querySelectorAll(".modal__form-input")
    );
    this.formValues = {};
    this._formInputs.forEach((input) => {
      this.formValues[input.name] = input.value;
    });

    return this.formValues;
  }

  setEventListeners(processingMessage) {
    this._popupElement.addEventListener("submit", (evt) => {
      this._getInputValues();
      this._handleFormSubmit(evt);
      this.setProcessingMessage(processingMessage);
    });
    super.setEventListeners();
  }

  resetForm() {
    this._form = this._popupElement.querySelector(".modal__form");
    this._form.reset();
  }

  setProcessingMessage(text) {
    this._submitButton.textContent = text;
  }

  removeProcessingMessage(text) {
    this._submitButton.textContent = text;
  }
}
