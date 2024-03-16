import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(".modal__form-input")
    );

    this._formValues = {};

    this._formInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt);
    });
    super.setEventListeners();
  }
}
