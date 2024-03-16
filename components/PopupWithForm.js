import Popup from "./Popup.js";

// The constructor only works if I pass in the function as an object I call by name.
//It only works for one named function at a time. I've tried passin in the functions without them being inside an object, but it doesn't work.
//I've also tried using "HandleFormSubmit" as shorthand for whatever type of function I pass into it, but that isn't working either.
export default class PopupWithForm extends Popup {
  constructor({ handleProfileFormSubmit }, popupSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleProfileFormSubmit;
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
      console.log("submit button clicked");
      this._handleFormSubmit(evt);
    });
    super.setEventListeners();
  }
}
