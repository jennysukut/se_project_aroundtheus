/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ARRAYS                                                                │
  └─────────────────────────────────────────────────────────────────────────┘
 */

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

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ELEMENTS                                                               │
  └─────────────────────────────────────────────────────────────────────────┘
 */

const editProfileButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector("#profile-title");
const profileEditForm = document.querySelector("#profile-edit-form");
const profileDescription = document.querySelector("#profile-description");
const editProfileModalName = document.querySelector(
  "#edit-profile-modal-title"
);
const editProfileModalDescription = document.querySelector(
  "#edit-profile-modal-description"
);

const cardListEl = document.querySelector("#cards-list");
const cardTemplate =
  document.querySelector("#cards-template").content.firstElementChild;

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const addCardModalTitle = document.querySelector("#add-card-modal-title");
const addCardModalLink = document.querySelector("#add-card-modal-link");

const cardTitleInput = addCardModal.querySelector("#add-card-modal-title");
const cardLinkInput = addCardModal.querySelector("#add-card-modal-link");

const cardImageModal = document.querySelector("#card-image-modal");
const fullImage = cardImageModal.querySelector("#modal-image");
const imageModalDescription = cardImageModal.querySelector(
  "#card-image-modal-description"
);

const closeButtons = document.querySelectorAll(".modal__close-button");

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ FUNCTIONS;                                                              │
  └─────────────────────────────────────────────────────────────────────────┘
 */

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileModalName.value;
  profileDescription.textContent = editProfileModalDescription.value;
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector("#card-title");
  const cardImageEl = cardElement.querySelector("#card-image");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  //Like Button

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button-active");
  });

  //Delete Button

  const cardDeleteButton = cardElement.querySelector("#card-delete-button");

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove(cardData);
  });

  //Image Modal

  cardImageEl.addEventListener("click", () => {
    openPopup(cardImageModal);
    fullImage.src = cardImageEl.src;
    fullImage.alt = cardTitleEl.textContent;
    imageModalDescription.textContent = cardTitleEl.textContent;
  });

  return cardElement;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });

  evt.target.reset();
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────                                                    │
  │ EVENT LISTENERS                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
 */

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

/* 
  ┌────────────────────────────────────────────────────────────────────────────┐
  │ LOOPS  │                                                                            │
  └────────────────────────────────────────────────────────────────────────────┘
 */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});
