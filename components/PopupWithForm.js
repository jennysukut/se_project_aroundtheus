import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
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
      //console.log(this._formValues);
    });
    super.setEventListeners();

    //add a submit event listener to the form and call the setEventListeners() method of the parent class.
  }
}

//Create an instance of the PopupWithForm class for each popup that contains a form,
//and call their setEventListeners() method.
