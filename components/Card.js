export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardLikeButton =
      this._cardSelector.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardSelector.querySelector(
      "#card-delete-button"
    );
    this._cardImageElement = this._cardSelector.querySelector("#card-image");
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    this._getTemplate();

    this._cardTitleElement = this._cardElement.querySelector("#card-title");
    this._cardImageElement = this._cardElement.querySelector("#card-image");

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _getTemplate() {
    this._cardElement = this._cardSelector.cloneNode(true);
  }

  _setEventListeners() {
    console.log("setting event listeners");
    console.log(this._cardLikeButton);
    console.log(this._cardDeleteButton);
    console.log(this._cardElement);
    this._cardLikeButton.addEventListener("click", () => {
      console.log("Card Like Button Clicked");
      _handleLikeButton();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      console.log("Delete Button Clicked");
      _handleDeleteButton();
    });
    this._cardImageElement.addEventListener("click", () => {
      console.log("Image clicked");
      this._handleImageClick(this);
    });
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle("card__like-button-active");
  }
}
