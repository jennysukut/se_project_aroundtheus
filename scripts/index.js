const initialCards = [
  {
    name: "Dolomites",
    link: "https://unsplash.com/photos/a-field-of-flowers-with-mountains-in-the-background-UM6icC4s4gQ",
  },
  {
    name: "Hallstatt",
    link: "https://unsplash.com/photos/a-scenic-view-of-a-town-on-a-lake-with-mountains-in-the-background-UW3oVK-HzbM",
  },
  {
    name: "Bryce Canyon",
    link: "https://unsplash.com/photos/brown-rock-formation-under-blue-sky-during-daytime-iFFUbr-4ByU",
  },
  {
    name: "Seceda",
    link: "https://unsplash.com/photos/a-rocky-mountain-with-snow-C229nrkAgUs",
  },
  {
    name: "Santorini",
    link: "https://unsplash.com/photos/white-and-blue-concrete-building-near-body-of-water-during-daytime-vF0l0bqLRKY",
  },
  {
    name: "Biertan",
    link: "https://unsplash.com/photos/aerial-view-of-city-during-daytime-VmIkAvcCdPo",
  },
];

const editProfileButton = document.querySelector("#profile-edit-button");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const modalNamePlaceholder = document.querySelector(
  "#edit-profile-modal-title"
);
const modalDescriptionPlaceholder = document.querySelector(
  "#edit-profile-modal-description"
);

editProfileButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  modalNamePlaceholder.value = profileName.textContent;
  modalDescriptionPlaceholder.value = profileDescription.textContent;
});

modalCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});
