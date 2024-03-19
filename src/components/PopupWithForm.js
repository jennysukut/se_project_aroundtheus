import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._formElement = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formInputs = Array.from(
      this._formElement.querySelectorAll(".modal__form-input")
    );
    this.formValues = {};
  }

  getInputValues() {
    this._formInputs.forEach((input) => {
      this.formValues[input.name] = input.value;
    });
    return this.formValues;
  }

  setInputValues(editFormTitle, editFormDetails) {
    editFormTitle.textContent = this.formValues.name;
    editFormDetails.textContent = this.formValues.description;
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

/*//Reviewer Notes: 
//You can make  setInputValues in class PopupWithForm, which can insert data into inputs:
//So, this way you’ll not have to search the inputs of the profile in index.js 

setInputValues(data) {
  this._inputList.forEach((input) => {
    // here you insert the `value` by the `name` of the input
    input.value = data[input.name];
  });
}*/
