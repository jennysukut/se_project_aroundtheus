import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popup, submitButton) {
    super(popup, submitButton);
    this._handleFormSubmit = handleFormSubmit;
    // this._submitButton = document.querySelector(submitButton);
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
      this.resetForm();
      this.setProcessingMessage(processingMessage); //this and the popup have to stay opened until the data is done processing?
    });
    super.setEventListeners();
  }

  resetForm() {
    this._form = this._popupElement.querySelector(".modal__form");
    this._form.reset();
  }
}
