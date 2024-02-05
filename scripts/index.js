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
const profileEditModalCloseButton = document.querySelector(
  "#profile-edit-modal-close-button"
);
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
const closeAddCardButton = document.querySelector(
  "#add-card-modal-close-button"
);
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.querySelector("#add-card-form");
const addCardModalTitle = document.querySelector("#add-card-modal-title");
const addCardModalLink = document.querySelector("#add-card-modal-link");
const cardTitleInput = addCardModal.querySelector("#add-card-modal-title");
const cardLinkInput = addCardModal.querySelector("#add-card-modal-link");

const cardLikeButton = document.querySelector("#card-like-button");

/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ FUNCTIONS;                                                              │
  └─────────────────────────────────────────────────────────────────────────┘
 */

function editProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileModalName.value;
  profileDescription.textContent = editProfileModalDescription.value;
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector("#card-title");
  const cardImageEl = cardElement.querySelector("#card-image");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function addCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  console.log(cardElement);
  cardListEl.prepend(cardElement);
  addCardModal.classList.remove("modal_opened");
}

/* 
  ┌─────────────────────────────────────────────────────────────────────────                                                    │
  │ EVENT LISTENERS                                                         │
  └─────────────────────────────────────────────────────────────────────────┘
 */

editProfileButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  editProfileModalName.value = profileName.textContent;
  editProfileModalDescription.value = profileDescription.textContent.trim();
});

profileEditForm.addEventListener("submit", editProfileFormSubmit);

profileEditModalCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});

addCardButton.addEventListener("click", () => {
  addCardModal.classList.add("modal_opened");
});

addCardForm.addEventListener("submit", addCardFormSubmit);

closeAddCardButton.addEventListener("click", () => {
  addCardModal.classList.remove("modal_opened");
});

/* 
  ┌────────────────────────────────────────────────────────────────────────────┐
  │ LOOPS  │                                                                            │
  └────────────────────────────────────────────────────────────────────────────┘
 */

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
