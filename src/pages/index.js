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
  selectors.editAvatarModal,
  selectors.avatarEditSubmitButton
);

const cardSection = new Section(createCard, selectors.cardSection);

const profileEdit = new PopupWithForm(
  handleProfileFormSubmit,
  selectors.profileEditForm,
  selectors.profileEditButton
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

profileEdit.setEventListeners(savingMessage);

addCard.setEventListeners(savingMessage);

previewModal.setEventListeners();

deleteCardConfirmModal.setEventListeners(savingMessage);

currentUserInfo.setEventListeners();

editAvatar.setEventListeners(savingMessage);

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
  deleteCardConfirmModal.open();
  deleteCardConfirmModal.setSubmitAction(() => {
    handleDeleteCard(id, cardElement);
  });
}

function handleImageClick(imgData) {
  previewModal.open(imgData);
}

function handleCardLike(id, likeFunction, unlikeFunction, button, card) {
  if (!card._isLiked) {
    pageInfo.cardLike(id).then((res) => {
      likeFunction(button, card);
    });
  } else {
    pageInfo.cardUnlike(id).then((res) => {
      unlikeFunction(button, card);
    });
  }
}

function handleDeleteCard(id, cardElement) {
  pageInfo
    .deleteCard(id)
    .then((res) => {
      cardElement.remove();
      cardElement = null;
      deleteCardConfirmModal.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      deleteCardConfirmModal.removeProcessingMessage("Yes");
    });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submittedUserInfo = profileEdit.formValues; //REVIEWER COMMENT HERE FOR MAKING SUBMIT FUNCTION
  const { name, description: about } = submittedUserInfo;
  pageInfo
    .changeUserInfo({ name, about })
    .then((response) => {
      const name = response.name;
      const description = response.about;
      updateUserInfo({ name, description });
      return response;
    })
    .then((res) => {
      console.log(res);
      profileEdit.close();
    })
    .then((res) => {
      formValidators["profile-edit-form"].resetValidation();
      profileEdit.resetForm();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profileEdit.removeProcessingMessage("Save");
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const submittedCardInfo = addCard.formValues;
  const { title: name, link } = submittedCardInfo;
  pageInfo
    .uploadCard({ name, link })
    .then((response) => {
      const cardElement = createCard(response);
      cardSection.pasteItem(cardElement);
      return response;
    })
    .then((response) => {
      addCard.close();
      addCard.resetForm();
      formValidators["add-card-form"].resetValidation();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCard.removeProcessingMessage("Create");
    });
}

function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  const { link } = editAvatar.formValues;
  pageInfo
    .changeUserAvatar(link)
    .then((res) => {
      currentUserInfo.updateAvatar(link);
      return res;
    })
    .then((response) => {
      editAvatar.close();
      formValidators["edit-avatar-form"].resetValidation();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editAvatar.removeProcessingMessage("Save");
    });
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

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ CREATE APIS                                                             │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const headers = {
  authorization: "0863e235-ec04-4229-a6bf-890245ffa3f4",
  "Content-Type": "application/json",
};

const pageInfo = new Api(
  "https://around-api.en.tripleten-services.com/v1",
  headers
);

pageInfo.getUserInfo().then((response) => {
  const name = response.name;
  const description = response.about;
  updateUserInfo({ name, description });
  currentUserInfo.updateAvatar(response.avatar);
});

pageInfo.fetchCards().then((data) => {
  // const { name, link, _id, isLiked } = data;
  cardSection.renderItems(data);
});

//pageInfo.deleteCard();
