import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, confirmButtonSelector, handleDeleteCard, functionTest) {
    super(popup);
    this._confirmButton = document.querySelector(confirmButtonSelector);
    this._handleDeleteCard = handleDeleteCard; //function used to call the Delete API - it isn't working?
    this._functionTest = functionTest;
  }

  open(id) {
    super.open();
    this._cardId = id;
  }

  handleConfirm() {
    console.log("You've said you want to delete the card!"); //this works!
    this._functionTest(this._cardId);
    // this._handleDeleteCard(this._cardId); //id isn't defined here - find a way to bring it in from the open to to this
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this.handleConfirm);
  }
}
