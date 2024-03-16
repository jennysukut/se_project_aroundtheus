export default class UserInfo {
  constructor(formValues) {
    this._submittedName = formValues.name;
    this._submittedDescription = formValues.description;
  }

  getUserInfo() {
    this._userInfo = {
      name: this._submittedName,
      description: this._submittedDescription,
    };
    console.log(this._userInfo.name);
    return this._userInfo;
  }

  setUserInfo(nameSelector, detailsSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._detailsSelector = document.querySelector(detailsSelector);

    this._nameSelector.textContent = this._userInfo.name;
    this._detailsSelector.textContent = this._userInfo.description;
  }
}
