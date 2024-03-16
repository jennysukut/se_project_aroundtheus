/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ IMPORTS                                                                 │
  └─────────────────────────────────────────────────────────────────────────┘
 */

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
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

const EditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const AddFormValidator = new FormValidator(validationSettings, addCardForm);

const PreviewModal = new PopupWithImage(selectors.previewModal);

const AddCard = new PopupWithForm(
  { handleAddCardFormSubmit },
  selectors.addCardForm
);

const CardSection = new Section(createCard, selectors.cardSection); // new concise code - does it work?

/*┌─────────────────────────────────────────────────────────────────────────┐
  │ INITIALIZE INSTANCES                                                    │
  └─────────────────────────────────────────────────────────────────────────┘
 */

CardSection.renderItems(initialCards);

EditFormValidator.enableValidation();

AddFormValidator.enableValidation();

PreviewModal.setEventListeners();

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
  PreviewModal.open(imgData);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  AddCard._getInputValues();

  const { title: name, link } = AddCard._formValues; //correctly destructured!!
  const data = AddCard._formValues;

  this._cardElement = createCard({ name, link });
  CardSection.addItem(this._cardElement); //THIS WORKS! Adds the card to the end of the list, I should look at prepending?

  evt.target.reset();
  AddFormValidator.toggleButtonState();
  AddCard.close();
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────│
  │ EVENT LISTENERS                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
*/

editProfileButton.addEventListener("click", () => {
  // open popup with form here, for editing profile
  openPopup(profileEditModal);
  editProfileModalName.value = profileName.textContent;
  editProfileModalDescription.value = profileDescription.textContent.trim();
});

addCardButton.addEventListener("click", () => {
  AddCard.open();
});
