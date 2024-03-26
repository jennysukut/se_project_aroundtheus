export default class Popup {
  constructor(popup, submitButton) {
    this._popupElement = document.querySelector(popup);
    this._popupCloseButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    this._submitButton = document.querySelector(submitButton);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClickOut(evt) {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  }

  setProcessingMessage(text) {
    console.log(this._submitButton);
    this._submitButton.textContent = text;
  }

  removeProcessingMessage(text) {
    console.log(this._submitButton);
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleClickOut(evt);
    });
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
}
