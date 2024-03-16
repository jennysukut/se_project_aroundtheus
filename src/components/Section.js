export default class Section {
  constructor(renderer, classSelector) {
    this._renderer = renderer;
    this._classElement = document.querySelector(classSelector);
  }

  renderItems(data) {
    data.forEach((data) => {
      this._element = this._renderer(data);
      this.addItem(this._element);
    });
  }

  addItem(element) {
    this._classElement.prepend(element);
  }
}
