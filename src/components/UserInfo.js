export default class UserInfo {
  constructor(
    profileName,
    profileDescription,
    profileAvatar,
    profileAvatarEdit,
    avatarImage
  ) {
    this._name = document.querySelector(profileName);
    this._description = document.querySelector(profileDescription);
    this._avatar = document.querySelector(profileAvatar);
    this._avatarEditButton = document.querySelector(profileAvatarEdit);
    this._avatarImage = document.querySelector(avatarImage);
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

  setEventListeners() {
    this._avatar.addEventListener("mouseover", () => {
      //DO NOT TOUCH
      this._avatarEditButton.classList.add("avatar-edit-button-visible");
      this._avatarImage.classList.add("profile__avatar-shaded");
    });
    this._avatar.addEventListener("mouseout", () => {
      this._avatarEditButton.classList.remove("avatar-edit-button-visible");
      this._avatarImage.classList.remove("profile__avatar-shaded");
    });
    this._avatarEditButton.addEventListener("click", () => {
      console.log("edit button clicked"); // this works!
      //code here to open the popupModal to change the profile avatar
    });
  }
}
