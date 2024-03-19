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
import {
  initialCards,
  validationSettings,
  selectors,
  editProfileButton,
  addCardButton,
  addCardForm,
  profileEditForm,
} from "../utils/constants.js";

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CREATE CLASS INSTANCES                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addCardForm);

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

/*┌─────────────────────────────────────────────────────────────────────────┐
  │ INITIALIZE INSTANCES                                                    │
  └─────────────────────────────────────────────────────────────────────────┘
 */

cardSection.renderItems(initialCards);

editFormValidator.enableValidation();

addFormValidator.enableValidation();

previewModal.setEventListeners();

addCard.setEventListeners();

profileEdit.setEventListeners();

/* 
  ┌─────────────────────────────────────────────────────────────────────────│
  │ FUNCTIONS                                                               │
  └─────────────────────────────────────────────────────────────────────────┘
*/

function createCard(data) {
  const cardElement = new Card({ data, handleImageClick }, "#cards-template");
  return cardElement.generateCard();
}

function handleImageClick(imgData) {
  previewModal.open(imgData);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileEdit.getInputValues();

  const { name, description } = profileEdit.formValues;

  const userInfo = new UserInfo({ name, description });
  userInfo.getUserInfo(); // Reviewer Feedback: "getUserInfo is for getting the info. You don't need to call it just for calling" -?- If I remove it, the function doesn't work.

  userInfo.setUserInfo(selectors.profileTitle, selectors.profileDescription);

  profileEdit.close();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCard.getInputValues();

  const { title: name, link } = addCard.formValues;
  const data = addCard.formValues;

  const cardElement = createCard({ name, link });
  cardSection.addItem(cardElement);

  evt.target.reset();
  addFormValidator.toggleButtonState();
  addCard.close();
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────│
  │ EVENT LISTENERS                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
*/

editProfileButton.addEventListener("click", () => {
  profileEdit.open();
  profileEdit.setInputValues(
    selectors.editFormTitle,
    selectors.editFormDetails
  ); //COULD I USE SET USER INFO WITH THE FORM SELECTORS?
});

addCardButton.addEventListener("click", () => {
  addCard.open();
});

/*LOOK AT IMPLEMENTING THIS FORM VALIDATOR CREATOR:
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // here you get the name of the form
    const formName = formElement.getAttribute("name");

    // here you store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(selectors); //FIND LIST OF FORMS*/
