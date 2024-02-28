export default class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    // this._handleImageClick = handleImageClick;
    console.log(this._text);
    console.log(this._image);
    console.log(this._cardSelector);
  } // when I pass in a const singular item, the properties show up perfectly!

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  /* _handleDeleteButton() {
    this._cardSelector
      .querySelector("#card-delete-button")
      .addEventListener("click", () => {
        console.log("You clicked the delete button!");
      });
  }*/

  //_handleLikeButton() {}

  // generateCard() {
  //get the card view?
  // this._setEventListeners();
  //return the card
  //  } //make a card, this one is public
}
