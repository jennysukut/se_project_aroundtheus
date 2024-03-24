export default class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this._classContainer = document.querySelector(classSelector);
  }

  renderItems(data) {
    data.forEach((data) => {
      this._element = this._renderer(data);
      this.addItem(this._element);
    });
  }

  addItem(element) {
    this._classContainer.prepend(element);
  }

  //having these methods differentiated helps the layout

  addItemsFromServer(element) {
    this._classContainer.append(element);
  }

  removeItem(element) {
    this._classContainer.remove(element);
  }
}
