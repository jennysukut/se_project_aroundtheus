export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._name = document.querySelector(profileName); //remove textContent
    this._description = document.querySelector(profileDescription);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return this._userInfo;
  }

  setUserInfo({ name, description }) {
    this._newTitle = name;
    this._newDescription = description;
    this._name.textContent = this._newTitle;
    this._description.textContent = this._newDescription;
  }
/*
  setFormInfo(formName, formDetails) {
    this._formName = document.querySelector(formName);
    this._formDetails = document.querySelector(formDetails);
    this._formName.value = this._userInfo.name;
    this._formDetails.value = this._userInfo.description;
  }*/

  //setFormInfo should not be in UserInfo. It's about the profile (the form is handled in index.js)
}
