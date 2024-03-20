export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._name = document.querySelector(profileName).textContent;
    this._description = document.querySelector(profileDescription).textContent;
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name,
      description: this._description,
    };
    return this._userInfo;
  }

  setUserInfo(profileSelector, detailsSelector) {
    this._profileTitle = document.querySelector(profileSelector);
    this._profileDescription = document.querySelector(detailsSelector);
    this._profileTitle.textContent = this._userInfo.name;
    this._profileDescription.textContent = this._userInfo.description;
  }

  setFormInfo(formName, formDetails) {
    this._formName = document.querySelector(formName);
    this._formDetails = document.querySelector(formDetails);
    this._formName.value = this._name;
    this._formDetails.value = this._description;
  }
}
