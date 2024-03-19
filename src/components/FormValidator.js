export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formSelector = settings.formSelector;
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this.toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    this._errorMessage = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessage.textContent = inputElement.validationMessage;
    this._errorMessage.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorMessage = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessage.textContent = "";
    this._errorMessage.classList.remove(this._errorClass);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      return this._disableButton();
    }
    this._enableButton();
  }

  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  resetValidation() {
    this.toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
