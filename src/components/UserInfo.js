export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name,
      description: this._description,
    };
    return this._userInfo;
  }

  setUserInfo(nameSelector, detailsSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDetails = document.querySelector(detailsSelector);

    this._profileName.textContent = this._userInfo.name;
    this._profileDetails.textContent = this._userInfo.description;
  }

  setUserFormValue(nameSelector, detailsSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDetails = document.querySelector(detailsSelector);

    this._profileName.value = this._userInfo.name;
    this._profileDetails.value = this._userInfo.description;
  }
}
