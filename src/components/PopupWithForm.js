import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popup) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
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

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      this._getInputValues();
      this._handleFormSubmit(evt);
      this.resetForm();
    });
    super.setEventListeners();
  }

  resetForm() {
    this._form = this._popupElement.querySelector(".modal__form");
    this._form.reset();
  }
}
