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
//import ConfirmationPopup from "../components/ConfirmationPopup.js";
import { profileAvatar } from "../utils/constants.js";
import {
  validationSettings,
  selectors,
  editProfileButton,
  addCardButton,
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
    const { name, link } = response;
    const cardElement = createCard({ name, link });
    cardSection.addItem(cardElement);
  });
});

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CREATE CLASS INSTANCES                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const previewModal = new PopupWithImage(selectors.previewModal);

const addCard = new PopupWithForm(
  handleAddCardFormSubmit,
  selectors.addCardForm
);

const cardSection = new Section(createCard, selectors.cardSection);

const profileEdit = new PopupWithForm(
  handleProfileFormSubmit,
  selectors.profileEditForm
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

profileEdit.setEventListeners();

addCard.setEventListeners();

previewModal.setEventListeners();

deleteCardConfirmModal.setEventListeners();

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

function deleteCardConfirm() {
  console.log("deleteCardModal clicked");
  deleteCardConfirmModal.open();
}

function createCard(data) {
  const cardElement = new Card(
    { data, handleImageClick },
    "#cards-template",
    deleteCardConfirm
  );
  return cardElement.generateCard();
}

function handleImageClick(imgData) {
  previewModal.open(imgData);
}

////FORM SUBMISSION FUNCTIONS

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submittedUserInfo = profileEdit.formValues;
  const { name, description: about } = submittedUserInfo;
  console.log({ name, about });
  profileInfo.changeUserInfo({ name, about }).then((response) => {
    const name = response.name;
    const description = response.about;
    updateUserInfo({ name, description }); //THIS WORKS!!! I wonder if I can consolitate the piece, since changing the user information uses the same steps after the response?
  });

  profileEdit.close();
  formValidators["profile-edit-form"].resetValidation();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submittedCardInfo = addCard.formValues;
  const { title: name, link } = submittedCardInfo;

  cardInfo.uploadCard({ name, link }).then((response) => {
    const name = response.name;
    const link = response.link;
    const cardElement = createCard({ name, link });
    cardSection.addItem(cardElement);
  }); //this works, but the placement is strange. When I add a card, it goes to the bottom of the list, then appears at the top on the reload?

  addCard.resetForm();
  formValidators["add-card-form"].resetValidation();
  addCard.close();
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

//find a way to delete the unwanted data from the array?
