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
    this._cardListElement = document.querySelector("#cards-list");
  }

  generateCard() {
    this._getTemplate();

    this._cardTitleElement = this._cardElement.querySelector("#card-title");
    this._cardImageElement = this._cardElement.querySelector("#card-image");

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    //set event listeners call?
    this._setEventListeners();

    //return card
    return this._cardElement;

    //add card to DOM? -- maybe just do this in the index?
    //  this._cardListElement.prepend(this._cardElement);
  }

  _getTemplate() {
    this._cardElement = this._cardSelector.cloneNode(true);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle("card__like-button-active");
  }
}
