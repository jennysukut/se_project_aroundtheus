import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  getInputValues() {
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(".modal__form-input")
    );
    this.formValues = {};
    this._formInputs.forEach((input) => {
      this.formValues[input.name] = input.value;
    });

    return this.formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt);
      this._resetForm();
    });
    super.setEventListeners();
  }

  _resetForm() {
    this._formInputs = "";
  }
}
