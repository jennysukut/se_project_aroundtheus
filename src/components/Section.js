export default class Section {
  constructor(renderer, currentClass) {
    this._renderer = renderer;
    this._currentClass = document.querySelector(currentClass);
  }

  renderItems(data) {
    data.forEach((data) => {
      this._element = this._renderer(data);
      this.addItem(this._element);
    });
  }

  addItem(element) {
    this._currentClass.prepend(element);
  }
}
