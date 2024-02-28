export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
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
      ...this._formElement.querySelectorAll(inputSelector),
    ];
  }

  _showInputError(inputElement /*{ inputErrorClass, errorClass }*/) {
    errorMessage = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessage.textContent = "";
    errorMessage.classList.remove(errorClass);
  }

  _toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputElements)) {
      return disableButton(submitButton, this._inactiveButtonClass);
    }
    enableButton(submitButton, { inactiveButtonClass });
  }

  _hasInvalidInput(inputList) {
    // work on this
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _disableButton(submitButton, { inactiveButtonClass }) {
    //work on this
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

  enableButton(submitButton, { inactiveButtonClass }) {
    //work on this
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  _setEventListeners() {
    const options = this._inputSelector;
    // const { inputSelector } = options;
    //const inputElements = [
    //  ...this._formElement.querySelectorAll(inputSelector),
    //];
    // const submitButton = this._formElement.querySelector(
    //   options.this._submitButtonSelector
    // );

    toggleButtonState(inputElements, submitButton, options);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        checkInputValidity(this._formElement, inputElement, options);
        toggleButtonState(inputElements, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  }
}

//const editFormValidator = new FormValidator(settings, editForm);
//const addFormValidator = new FormValidator(settings, addForm);
