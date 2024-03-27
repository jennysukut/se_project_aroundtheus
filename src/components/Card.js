export default class Card {
  constructor(
    { data, handleImageClick },
    cardSelector,
    deleteCardConfirm,
    cardLikeFunction,
    cardUnlikeFunction
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this.isLiked = data.isLiked;
    this._currentCard = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteCardConfirm = deleteCardConfirm;
    this._cardLikeFunction = cardLikeFunction;
    this._cardUnlikeFunction = cardUnlikeFunction;
  }

  generateCard() {
    this._getTemplate();

    this._cardLikeButton =
      this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      "#card-delete-button"
    );

    this.cardTitleElement = this._cardElement.querySelector("#card-title");
    this.cardImageElement = this._cardElement.querySelector("#card-image");

    this.cardTitleElement.textContent = this._name;
    this.cardImageElement.src = this._link;
    this.cardImageElement.alt = this._name;

    this._setEventListeners();

    if (this.isLiked) {
      this._cardLikeButton.classList.add("card__like-button-active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button-active");
    }

    return this._cardElement;
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._currentCard)
      .content.firstElementChild.cloneNode(true);
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._cardLikeFunction(
        this._id,
        this._likeFunction,
        this._unlikeFunction,
        this._cardLikeButton,
        this
      );
    });
    this._cardDeleteButton.addEventListener("click", () => {
      this._deleteCardConfirm(this._id, this._cardElement);
    });
    this.cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  _likeFunction(button, card) {
    button.classList.add("card__like-button-active");
    card.isLiked = true;
  }

  _unlikeFunction(button, card) {
    button.classList.remove("card__like-button-active");
    card.isLiked = false;
  }
}
