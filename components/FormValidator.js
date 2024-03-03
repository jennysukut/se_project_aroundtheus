export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formSelector = settings.formSelector;
    this._formElement = formElement;
    this._formElements = [...document.querySelectorAll(this._formSelector)];
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

    this._inputElement = this._formElement.querySelector(this._inputSelector);
    //this._errorMessage = `#${this._inputElement.id}-error`;
    this._errorMessage = this._formElement.querySelector(
      `#${this._inputElement.id}-error`
    );

    console.log(this._inputElements);
    console.log(this._inputElement);
    console.log(this._formElement);
  }

  enableValidation() {
    console.log("running enable validation function");
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log("listening to submit button");
    });
    this._setEventListeners(this._formElement);
  }

  _setEventListeners() {
    console.log("setting event listeners");
    this._toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity() {
    //this function isn't running
    console.log("checking input validity");
    if (!this._inputElement.validity.valid) {
      this._showInputError(this._inputElement);
    } else {
      this._hideInputError(this._inputElement);
    }
  }

  _showInputError() {
    console.log("showing input error");
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorMessage.textContent = this._inputElement.validationMessage;
    this._errorMessage.classList.add(this._errorClass);
  }

  _hideInputError() {
    console.log("hiding input error");
    this._inputElement.classList.remove(this._inputErrorClass);
    console.log(this._errorMessage);
    this._errorMessage.textContent = "";
    this._errorMessage.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    console.log("toggling button state");
    if (this._hasInvalidInput()) {
      return this._disableButton();
    }
    this._enableButton();
  }

  _hasInvalidInput() {
    console.log("checking invalid input");
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _disableButton() {
    console.log("disabling button");
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    console.log("enabling button");
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}

//const editFormValidator = new FormValidator(settings, editForm);
//const addFormValidator = new FormValidator(settings, addForm);
