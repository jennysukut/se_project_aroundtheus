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
  selectors.deleteCardButton,
  handleDeleteCard
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
    handleDeleteCard(id);
  });
  console.log(cardElement);
  //cardSection.removeItem({ cardElement }); //Whenever I call this, it freezes the page.
  //IT looks like it SHOULD work, and the card does get deleted.
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
  });
  //I delete the information from the server here. It isn't reflected on the home screen.
  //I have a method inside the Card class that takes the card element and removes it visually from the page/DOM without needing a reload.
  //Only I can't access the card element from right here, since it's created inside my createCard function.
  //Here are a few things I've tried:
  //cardSection.removeItem(cardElement);
  //cardElement.handleDeleteConfirmation(); //can't access cardElement from here.
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
      profileEdit.close(); //the form is cleared of it's values after submission, before the modal closes. Is it supposed to be this way?
    })
    .then((res) => {
      formValidators["profile-edit-form"].resetValidation();
      profileEdit.resetForm(); //don't forget to reset the form to having the original text content in place after submission.
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submittedCardInfo = addCard.formValues;
  const { title: name, link } = submittedCardInfo;

  cardInfo.uploadCard({ name, link }).then((response) => {
    const cardElement = createCard(response);
    cardSection.addItem(cardElement);
  });

  addCard.resetForm();
  formValidators["add-card-form"].resetValidation();
  addCard.close();
}

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const { link } = editAvatar.formValues;
  console.log(link); // got it!
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
