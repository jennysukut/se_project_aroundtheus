/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ IMPORTS                                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { profileAvatar } from "../utils/constants.js";
import {
  validationSettings,
  selectors,
  editProfileButton,
  addCardButton,
  editAvatarButton,
  savingMessage,
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CREATE APIS                                                             │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const profileInfo = new Api();
profileInfo.getUserInfo().then((response) => {
  const name = response.name;
  const description = response.about;
  updateUserInfo({ name, description });
  profileAvatar.src = response.avatar;
});

const cardInfo = new Api();
cardInfo.fetchCards().then((response) => {
  response.forEach((response) => {
    const { name, link, _id, isLiked } = response;
    const cardElement = createCard({ name, link, _id, isLiked });
    cardSection.addItemsFromServer(cardElement);
  });
});

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CREATE CLASS INSTANCES                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription,
  selectors.profileAvatarContainer,
  selectors.profileAvatarEdit,
  selectors.avatarImage
);

const previewModal = new PopupWithImage(selectors.previewModal);

const addCard = new PopupWithForm(
  handleAddCardFormSubmit,
  selectors.addCardForm,
  selectors.addCardButton
);

const editAvatar = new PopupWithForm(
  handleChangeAvatarSubmit,
  selectors.editAvatarModal
);

const cardSection = new Section(createCard, selectors.cardSection);

const profileEdit = new PopupWithForm(
  handleProfileFormSubmit,
  selectors.profileEditForm,
  selectors.profileEditButton
);

const deleteCardConfirmModal = new PopupWithConfirmation(
  selectors.deleteCardModal,
  selectors.deleteCardButton
);

const formValidators = {};

const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formsSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

/*┌─────────────────────────────────────────────────────────────────────────┐
  │ INITIALIZE INSTANCES                                                    │
  └─────────────────────────────────────────────────────────────────────────┘
 */

enableValidation(selectors);

profileEdit.setEventListeners(savingMessage);

addCard.setEventListeners(savingMessage);

previewModal.setEventListeners();

deleteCardConfirmModal.setEventListeners(savingMessage);

currentUserInfo.setEventListeners();

editAvatar.setEventListeners();

/* 
  ┌─────────────────────────────────────────────────────────────────────────│
  │ FUNCTIONS                                                               │
  └─────────────────────────────────────────────────────────────────────────┘
*/

function updateUserInfo({ name, description }) {
  currentUserInfo.setUserInfo({ name, description });
}

function setFormInfo(nameSelector, detailsSelector) {
  const formName = document.querySelector(nameSelector);
  const formDetails = document.querySelector(detailsSelector);
  const { description, name } = currentUserInfo.getUserInfo();
  formName.value = name.trim();
  formDetails.value = description.trim();
}

function createCard(data) {
  const cardElement = new Card(
    { data, handleImageClick },
    "#cards-template",
    deleteCardConfirm,
    handleCardLike,
    handleCardUnlike
  );
  return cardElement.generateCard();
}

function deleteCardConfirm(id, cardElement) {
  deleteCardConfirmModal.open();
  deleteCardConfirmModal.setSubmitAction(() => {
    handleDeleteCard(id, cardElement);
  });
  //cardSection.removeItem({ cardElement }); //Whenever I call this, it freezes the page.
  //It looks like it SHOULD work, and the card does get deleted.
  //Do you use a page reload, since something was removed from the server?
}

function handleImageClick(imgData) {
  previewModal.open(imgData);
}

function handleCardLike(id) {
  cardInfo.cardLike(id);
}

function handleCardUnlike(id) {
  cardInfo.cardUnlike(id);
}

function handleDeleteCard(id, cardElement) {
  cardInfo.deleteCard(id).then((res) => {
    console.log(res);
    cardElement.remove();
    cardElement = null;
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submittedUserInfo = profileEdit.formValues;
  const { name, description: about } = submittedUserInfo;
  profileInfo
    .changeUserInfo({ name, about })
    .then((response) => {
      const name = response.name;
      const description = response.about;
      updateUserInfo({ name, description });
    })
    .then((res) => {
      profileEdit.close();
    })
    .then((res) => {
      formValidators["profile-edit-form"].resetValidation();
      profileEdit.removeProcessingMessage("Save");
      profileEdit.resetForm();
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submittedCardInfo = addCard.formValues;
  const { title: name, link } = submittedCardInfo;

  cardInfo
    .uploadCard({ name, link })
    .then((response) => {
      const cardElement = createCard(response);
      cardSection.addItem(cardElement);
    })
    .then((res) => {
      addCard.close();
      //cardElement.onLoad = addCard.close(); //find a way to use an onload function to make sure this isn't closed until the card is loaded
    })
    .then((res) => {
      addCard.resetForm();
      addCard.removeProcessingMessage("Create");
      formValidators["add-card-form"].resetValidation();
    });
}

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const { link } = editAvatar.formValues;
  console.log(link);
  profileInfo.changeUserAvatar(link); //this works! It just needs a reload of the page to actually show up.

  editAvatar.close();
  formValidators["edit-avatar-form"].resetValidation();
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────│
  │ EVENT LISTENERS                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
*/

editProfileButton.addEventListener("click", () => {
  profileEdit.open();
  setFormInfo(selectors.editFormTitle, selectors.editFormDetails);
});

addCardButton.addEventListener("click", () => {
  addCard.open();
});

editAvatarButton.addEventListener("click", () => {
  editAvatar.open();
});
