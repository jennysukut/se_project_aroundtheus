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
  // initialCards,
  validationSettings,
  selectors,
  editProfileButton,
  addCardButton,
} from "../utils/constants.js";

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CREATE CLASS INSTANCES                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

///////////////////////////////

//CODE FOR GRABBING CURRENT USER INFO
const profileInfo = new Api();
profileInfo.getUserInfo().then((response) => {
  const name = response.name;
  const description = response.about;
  updateUserInfo({ name, description });
  profileAvatar.src = response.avatar;
}); //GOT IT!

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

//CODE FOR SENDING CURRENT INFORMATION TO THE SERVER & RENDERING THE CARDS!
const cardInfo = new Api();
//cardInfo.uploadInitialCards(initialCards);
cardInfo.fetchCards().then((response) => {
  response.forEach((response) => {
    const { name, link } = response;
    console.log({ name, link });
    const cardElement = createCard({ name, link });
    cardSection.addItem(cardElement); //THIS WORKS!!!
  });
});
//got this to work? but it comes back with 30 cards saved to the server.
//I'll see if I can delete some. OH! Just make a delete card function to do it there.

//CODE FOR MAKING NEW CARDS

////////////////////////////////////

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

//CODE FOR SENDING CARD INFO TO THE SERVER
/*const testCard = {
  name: "Santorini",
  link: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
const testName = testCard.name;
const testLink = testCard.link;

const newCard = new Api();
newCard
  .uploadCard({ testName, testLink })
  .then((response) => console.log(response)); //write a forEach method for the initial cards array that calls the uploadCard method of the newCardArray
*/

/*┌─────────────────────────────────────────────────────────────────────────┐
  │ INITIALIZE INSTANCES                                                    │
  └─────────────────────────────────────────────────────────────────────────┘
 */

cardSection.renderItems(initialCards);

enableValidation(selectors);

profileEdit.setEventListeners();

addCard.setEventListeners();

previewModal.setEventListeners();

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
  const cardElement = new Card({ data, handleImageClick }, "#cards-template");
  return cardElement.generateCard();
}

function handleImageClick(imgData) {
  previewModal.open(imgData);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const { name, description } = profileEdit.formValues;
  updateUserInfo(profileEdit.formValues);

  profileEdit.close();
  formValidators["profile-edit-form"].resetValidation();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const { title: name, link } = addCard.formValues;

  const cardElement = createCard({ name, link }); //HERE, you need to send the information over to the api server and have it be rendered from there?
  cardSection.addItem(cardElement);

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
