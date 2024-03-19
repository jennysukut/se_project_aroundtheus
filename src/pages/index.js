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
} from "../utils/constants.js";

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CREATE CLASS INSTANCES                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const initialUserInfo = {
  name: "Jacques Cousteau",
  description: "Explorer",
};

const userInfo = new UserInfo(initialUserInfo);
updateUserInfo(selectors.profileTitle, selectors.profileDescription);

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

    console.log(validator);
    validator.enableValidation();
  });
};

/*┌─────────────────────────────────────────────────────────────────────────┐
  │ INITIALIZE INSTANCES                                                    │
  └─────────────────────────────────────────────────────────────────────────┘
 */

cardSection.renderItems(initialCards);

previewModal.setEventListeners();

addCard.setEventListeners();

profileEdit.setEventListeners();

enableValidation(selectors);

/* 
  ┌─────────────────────────────────────────────────────────────────────────│
  │ FUNCTIONS                                                               │
  └─────────────────────────────────────────────────────────────────────────┘
*/

function updateUserInfo(nameSelector, detailsSelector) {
  userInfo.getUserInfo();
  userInfo.setUserInfo(nameSelector, detailsSelector);
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
  profileEdit.getInputValues();

  const { name, description } = profileEdit.formValues;

  userInfo._name = name;
  userInfo._description = description;

  updateUserInfo(selectors.profileTitle, selectors.profileDescription);

  profileEdit.close();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCard.getInputValues();

  const { title: name, link } = addCard.formValues;
  const data = addCard.formValues;
  console.log(data);

  const cardElement = createCard({ name, link });
  cardSection.addItem(cardElement);

  evt.target.reset();
  //validator.toggleButtonState(); //Find the form name for this specific Validator
  //formValidators.toggleButtonState();
  //validator.resetValidation();
  addCard.close();
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────│
  │ EVENT LISTENERS                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
*/

editProfileButton.addEventListener("click", () => {
  profileEdit.open();
});

addCardButton.addEventListener("click", () => {
  addCard.open();
});
