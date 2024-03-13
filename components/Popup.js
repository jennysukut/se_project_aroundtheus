export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickOut(evt) {
    if (evt.target.classList.contains("modal")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleClickOut(evt);
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("click", this._handleClickOut);
  }
}

//You won’t instantiate your Popup class directly in index.js;
//instead, you’ll instantiate its children classes, as described below.
