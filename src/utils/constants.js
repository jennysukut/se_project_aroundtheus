/*┌─────────────────────────────────────────────────────────────────────────┐
  │ ARRAYS                                                                  │
  └─────────────────────────────────────────────────────────────────────────┘
   */

/*export const initialCards = [
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
];*/

/* 
      ┌─────────────────────────────────────────────────────────────────────────┐
      │ ELEMENTS                                                                │
      └─────────────────────────────────────────────────────────────────────────┘
     */

export const editProfileButton = document.querySelector("#profile-edit-button");
export const profileEditForm = document.forms["profile-edit-form"];
export const addCardButton = document.querySelector(".profile__add-button");
export const addCardForm = document.forms["add-card-form"];
export const profileAvatar = document.querySelector(".profile__avatar");

export const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const selectors = {
  cardSection: "#cards-list",
  cardTemplate: "#cards-template",
  previewModal: "#card-image-modal",
  addCardForm: "#add-card-modal",
  cardTitleInput: "#add-card-modal-title",
  cardLinkInput: "#add-card-modal-link",
  profileEditForm: "#profile-edit-modal",
  profileDescription: "#profile-description",
  profileTitle: "#profile-title",
  formSelector: ".modal__form",
  editFormTitle: "#edit-profile-modal-title",
  editFormDetails: "#edit-profile-modal-description",
  formsSelector: ".modal__form",
};
