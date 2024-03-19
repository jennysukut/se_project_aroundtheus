export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("click", this._handleClickOut);
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
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

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleClickOut(evt);
    });
    document.addEventListener("keydown", this._handleEscClose);
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
