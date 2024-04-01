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
  │ CREATE API                                                              │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const headers = {
  authorization: "0863e235-ec04-4229-a6bf-890245ffa3f4",
  "Content-Type": "application/json",
};

const api = new Api("https://around-api.en.tripleten-services.com/v1", headers);

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

const previewPopup = new PopupWithImage(selectors.previewModal);

const addCardPopup = new PopupWithForm(
  handleAddCardFormSubmit,
  selectors.addCardForm,
  selectors.addCardButton
);

const editAvatarPopup = new PopupWithForm(
  handleChangeAvatarSubmit,
  selectors.editAvatarModal,
  selectors.avatarEditSubmitButton
);

const cardSection = new Section(createCard, selectors.cardSection);

const profileEditPopup = new PopupWithForm(
  handleProfileFormSubmit,
  selectors.profileEditForm,
  selectors.profileEditButton
);

const deleteCardConfirmPopup = new PopupWithConfirmation(
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

profileEditPopup.setEventListeners(savingMessage);

addCardPopup.setEventListeners(savingMessage);

previewPopup.setEventListeners();

deleteCardConfirmPopup.setEventListeners(savingMessage);

currentUserInfo.setEventListeners();

editAvatarPopup.setEventListeners(savingMessage);

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
    handleCardLike
  );
  return cardElement.generateCard();
}

function deleteCardConfirm(id, cardElement) {
  deleteCardConfirmPopup.open();
  deleteCardConfirmPopup.setSubmitAction(() => {
    handleDeleteCard(id, cardElement);
  });
}

function handleImageClick(imgData) {
  previewPopup.open(imgData);
}

function handleCardLike(id, likeFunction, unlikeFunction, button, card) {
  if (!card.isLiked) {
    api
      .cardLike(id)
      .then((res) => {
        likeFunction(button, card);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .cardUnlike(id)
      .then((res) => {
        unlikeFunction(button, card);
      })
      .catch((err) => console.log(err));
  }
}

function handleDeleteCard(id, cardElement) {
  api
    .deleteCard(id)
    .then((res) => {
      cardElement.remove();
      cardElement = null;
      deleteCardConfirmPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      deleteCardConfirmPopup.removeProcessingMessage("Yes");
    });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submittedUserInfo = profileEditPopup.formValues;
  const { name, description: about } = submittedUserInfo;
  api
    .changeUserInfo({ name, about })
    .then((response) => {
      const name = response.name;
      const description = response.about;
      updateUserInfo({ name, description });
      return response;
    })
    .then((res) => {
      profileEditPopup.close();
    })
    .then((res) => {
      formValidators["profile-edit-form"].resetValidation();
      profileEditPopup.resetForm();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileEditPopup.removeProcessingMessage("Save");
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submittedCardInfo = addCardPopup.formValues;
  const { title: name, link } = submittedCardInfo;
  api
    .uploadCard({ name, link })
    .then((response) => {
      const cardElement = createCard(response);
      cardSection.pasteItem(cardElement);
      return response;
    })
    .then((response) => {
      addCardPopup.close();
      addCardPopup.resetForm();
      formValidators["add-card-form"].resetValidation();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.removeProcessingMessage("Create");
    });
}

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const { link } = editAvatarPopup.formValues;
  api
    .changeUserAvatar(link)
    .then((res) => {
      currentUserInfo.updateAvatar(link);
      return res;
    })
    .then((response) => {
      editAvatarPopup.close();
      formValidators["edit-avatar-form"].resetValidation();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editAvatarPopup.removeProcessingMessage("Save");
    });
}

/*function handleSubmit(request, data, popupInstance, loadingText = "Saving...") {
  // here we change the button text
  popupInstance.renderLoading(true, loadingText);
  request(data)
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submittedUserInfo = profileEditPopup.formValues; //REVIEWER COMMENT HERE FOR MAKING SUBMIT FUNCTION
  const { name, description: about } = submittedUserInfo;
  handleSubmit(
    api.changeUserInfo,
    { name, about },
    profileEditPopup,
    "Saving..."
  )
    .then((response) => {
      const name = response.name;
      const description = response.about;
      updateUserInfo({ name, description });
      return response;
    })
    .then((res) => {
      formValidators["profile-edit-form"].resetValidation();
      profileEditPopup.resetForm();
    });
}*/

/* 
  ┌─────────────────────────────────────────────────────────────────────────│
  │ EVENT LISTENERS                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
*/

editProfileButton.addEventListener("click", () => {
  profileEditPopup.open();
  setFormInfo(selectors.editFormTitle, selectors.editFormDetails);
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ LOAD PAGE                                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

api.getUserInfo().then((response) => {
  const name = response.name;
  const description = response.about;
  updateUserInfo({ name, description });
  currentUserInfo.updateAvatar(response.avatar);
});

api.fetchCards().then((data) => {
  // const { name, link, _id, isLiked } = data;
  cardSection.renderItems(data);
});
