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

/*const AddCardModal = new PopupWithForm(
  {
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      AddCardModal._getInputValues();

      console.log(AddCardModal._formValues); //THIS HAS THE VALUES!!

      const { title: name, link } = AddCardModal._formValues; //correctly destructured!!
      console.log(name);
      console.log(link);

      const data = AddCardModal._formValues;

      const addedCardElement = new Card(
        {
          data,
          handleImageClick: (imgData) => {
            PreviewModal.open(imgData);
          },
        },
        "#cards-template"
      );

      //GENERATE THE CARD HERE
      addedCardElement.generateCard(); //this doesn't work - find the correct action to render the new card
      //Add card to the DOM

      evt.target.reset();
      AddFormValidator.toggleButtonState();
      AddCardModal.close();
    },
  },
  selectors.addCardForm
);
*/

const AddCard = new PopupWithForm(
  {
    handleFormSubmit: (evt) => {
      evt.preventDefault();
      AddCard._getInputValues();

      const { title: name, link } = AddCard._formValues; //correctly destructured!!

      const data = AddCard._formValues;
      console.log(data); //working here

      const AddedCard = new Section(
        {
          renderer: (data) => {
            const addedCardElement = new Card(
              {
                data,
                handleImageClick: (imgData) => {
                  PreviewModal.open(imgData);
                },
              },
              "#cards-template"
            ); // NEW CARD MADE

            addedCardElement.generateCard(); //THIS IS INSIDE THE SECTION RENDERER
          },
        },
        selectors.cardSection
      ); //SECTION IS MADE

      AddedCard.renderItems(data); //is this right?

      evt.target.reset();
      AddFormValidator.toggleButtonState();
      AddCard.close();
    },
  },
  selectors.addCardForm
);

///////////////////////////

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
  AddCard.open();
});
