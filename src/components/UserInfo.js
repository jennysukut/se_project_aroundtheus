export default class UserInfo {
  constructor({ name, description }) {
    this._submittedName = name;
    this._submittedDescription = description;
  }

  getUserInfo() {
    this._userInfo = {
      name: this._submittedName,
      description: this._submittedDescription,
    };
    return this._userInfo;
  }

  setUserInfo(nameSelector, detailsSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDetails = document.querySelector(detailsSelector);

    this._profileName.textContent = this._userInfo.name;
    this._profileDetails.textContent = this._userInfo.description;
  }
}
