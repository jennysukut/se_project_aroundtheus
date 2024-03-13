/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ IMPORTS                                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
//import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
//import PopupWithForm from "../components/PopupWithForm.js";
//import UserInfo from "../components/UserInfo.js";

/*┌─────────────────────────────────────────────────────────────────────────┐
  │ ARRAYS                                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
   */
/*
const initialCards = [
  {
    name: "Dolomites",
    link: "https://images.unsplash.com/photo-1683899266164-219e1ebdf029?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hallstatt",
    link: "https://images.unsplash.com/photo-1633886648986-ec392f72d900?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bryce Canyon",
    link: "https://images.unsplash.com/photo-1631028771413-1389145e26f7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Biertan",
    link: "https://images.unsplash.com/photo-1600120834153-6700a1a3399b?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Seceda",
    link: "https://images.unsplash.com/photo-1670443437765-f0239aebf4b0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Santorini",
    link: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const testData = {
  name: "Santorini",
  link: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

/* 
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ ELEMENTS                                                                │
    └─────────────────────────────────────────────────────────────────────────┘
   */
/*
const editProfileButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector("#profile-title");
const profileEditForm = document.forms["profile-edit-form"];

const profileDescription = document.querySelector("#profile-description");
const editProfileModalName = document.querySelector(
  "#edit-profile-modal-title"
);
const editProfileModalDescription = document.querySelector(
  "#edit-profile-modal-description"
);

const cardListElement = document.querySelector("#cards-list");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];

const cardTitleInput = addCardModal.querySelector("#add-card-modal-title");
const cardLinkInput = addCardModal.querySelector("#add-card-modal-link");

const cardImageModal = document.querySelector("#card-image-modal");
const fullImage = cardImageModal.querySelector("#modal-image");
const imageModalDescription = cardImageModal.querySelector(
  "#card-image-modal-description"
);

const closeButtons = document.querySelectorAll(".modal__close-button");
const modals = document.querySelectorAll(".modal");

const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};*/

//const editFormValidator = new FormValidator(
//  validationSettings,
//  profileEditForm
//);
//editFormValidator.enableValidation();
//
//const addFormValidator = new FormValidator(validationSettings, addCardForm);
//addFormValidator.enableValidation();
//
//const popupWithImage = new PopupWithImage("#card-image-modal");
//popupWithImage.open(testData);
// We need to put this function with the cards and connect it to the individual cards, in case their images are

/* 
    ┌─────────────────────────────────────────────────────────────────────────┐
    │ FUNCTIONS;                                                              │
    └─────────────────────────────────────────────────────────────────────────┘
   */

//function handleEscape(evt) {
//  if (evt.key === "Escape") {
//    modals.forEach(closePopup);
//  }
//}

//function handleClickOut(evt) {
//  if (evt.target.classList.contains("modal")) {
//    closePopup(evt.target);
//  }
//}

//function openPopup(popup) {
//  popup.classList.add("modal_opened");
//  popup.addEventListener("click", handleClickOut);
//  document.addEventListener("keydown", handleEscape);
//}

//function closePopup(popup) {
//  popup.classList.remove("modal_opened");
//  document.removeEventListener("keydown", handleEscape);
//  popup.removeEventListener("click", handleClickOut);
//}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileModalName.value;
  profileDescription.textContent = editProfileModalDescription.value;
  closePopup(profileEditModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const data = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = createCard(data);
  addCard(cardElement);

  evt.target.reset();
  addFormValidator.toggleButtonState();
  closePopup(addCardModal);
}

/*
function createCard(data) {
  const cardElement = new Card(data, "#cards-template"); //this needs to be replaced with the image click form popup class method?
  return cardElement.generateCard();
}

function addCard(cardElement) {
  cardListElement.prepend(cardElement);
}*/

//function handleImageClick(card) {
//  //this needs to be replaced with the PopupWithImage Class that opens the popup
//  openPopup(cardImageModal);
//  fullImage.src = card.cardImageElement.src;
//  fullImage.alt = card.cardTitleElement.textContent;
//  imageModalDescription.textContent = card.cardTitleElement.textContent;
//}

/* 
    ┌─────────────────────────────────────────────────────────────────────────│
    │ EVENT LISTENERS                                                         │
    └─────────────────────────────────────────────────────────────────────────┘
   */
/*
editProfileButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  editProfileModalName.value = profileName.textContent;
  editProfileModalDescription.value = profileDescription.textContent.trim();
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

addCardForm.addEventListener("submit", handleCardFormSubmit);
*/
/* 
    ┌────────────────────────────────────────────────────────────────────────────┐
    │ LOOPS                                                                      │
    └────────────────────────────────────────────────────────────────────────────┘
   */

//closeButtons.forEach((button) => {
//  const popup = button.closest(".modal");
//  button.addEventListener("click", () => closePopup(popup));
//});

/*initialCards.forEach((data) => {
  const cardElement = createCard(data);
  addCard(cardElement);
});*/
