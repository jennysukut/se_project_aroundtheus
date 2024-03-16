import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleAddCardFormSubmit }, popupSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleAddCardFormSubmit;
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

//Create an instance of the PopupWithForm class for each popup that contains a form,
//and call their setEventListeners() method.
