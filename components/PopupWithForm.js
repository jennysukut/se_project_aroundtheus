import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // this has to work for both the edit profile and add card values?
    this._linkValue = this._formElement.querySelector("#add-card-modal-link");
    this._nameValue = this._formElement.querySelector("#add-card-modal-title");
    this._data = {
      name: this._nameValue.value,
      link: this._linkValue.value,
    };
    return this._data; // pass this to the submisision handler as an argument
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt);
      console.log(this._data);
    });
    super.setEventListeners();

    //add a submit event listener to the form and call the setEventListeners() method of the parent class.
  }
}

//Create an instance of the PopupWithForm class for each popup that contains a form,
//and call their setEventListeners() method.
