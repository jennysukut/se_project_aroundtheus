import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // this has to work for both the edit profile and add card values?
    this._formFields = Array.from(
      this._formElement.querySelectorAll(".modal__form-input")
    );

    this._formInput = [];

    this._formFields.forEach((input) => {
      this._formInput.push(input.value);
      //iterate through this array and add each element to an object/array that I'll return and pass to the submission handler
    });
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt, this._formInput);
      console.log(this._formInput);
    });
    super.setEventListeners();

    //add a submit event listener to the form and call the setEventListeners() method of the parent class.
  }
}

//Create an instance of the PopupWithForm class for each popup that contains a form,
//and call their setEventListeners() method.
