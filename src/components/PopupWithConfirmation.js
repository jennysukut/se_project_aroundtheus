import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, confirmButtonSelector) {
    super(popup);
    this._confirmButton = document.querySelector(confirmButtonSelector);
  }

  open() {
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault(); //put this here?
      this._handleExecute(); //It Works!!
      this.close();
    });
    //    this._popupElement.addEventListener("keydown", (evt) => {
    //      console.log("listening to the popup");
    //      if (evt.key === "Enter") {
    //        console.log("Enter pressed");
    //      }
    //    });
  }

  setSubmitAction(action) {
    this._handleExecute = action;
  }
}
