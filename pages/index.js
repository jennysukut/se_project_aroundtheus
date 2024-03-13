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

const AddCardModal = new PopupWithForm(
  {
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      console.log("handleFormSubmit has run");
      AddCardModal._getInputValues(); //got the input values - I can do this here or within the PopupWithForm Section. Which would be better?

      //const cardElement = createCard(data);
      //addCard(cardElement);
      //

      evt.target.reset();
      AddFormValidator.toggleButtonState();
      AddCardModal.close(); //opens and closes just fine. Need to make a card from here to add to the cardSection?
    },
  },
  selectors.addCardForm
);

const CardSection = new Section(
  {
    renderer: (data) => {
      const cardElement = new Card(
        {
          data,
          handleImageClick: (imgData) => {
            PreviewModal.open(imgData);
          },
        },
        "#cards-template"
      );
      return cardElement.generateCard();
    },
  },
  selectors.cardSection
);

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
  AddCardModal.open();
});
