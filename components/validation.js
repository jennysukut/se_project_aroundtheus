/*
// this is called when you check input validity, if it comes back invalid
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  //find the error message inside the form Element
  errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  //add the inputErrorClass to the input
  inputElement.classList.add(inputErrorClass);
  //make the error message match the input element's validation message - this comes with the system
  errorMessage.textContent = inputElement.validationMessage;
  //add the errorClass to the error message
  errorMessage.classList.add(errorClass);
}*/
/*
//this is called when you check input validity, if it comes back valid
function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  //find the error message inside the formElement
  errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  //remove the inputerrorclass fom the inputElement
  inputElement.classList.remove(inputErrorClass);
  //remove the error message
  errorMessage.textContent = "";
  //remove the errorClass from the errorMessage classlist?
  errorMessage.classList.remove(errorClass);
}*/
/*
//this function is called when you're setting event listeners for input on the forms
function checkInputValidity(formElement, inputElement, options) {
  //if the inputElement's validity IS NOT valid, run the showInputError function
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    //if the inputElement is valid, hide the input error by calling the hideInputError
    hideInputError(formElement, inputElement, options);
  }
}*/

/*
//this function is called inside the toggleButtonState function
function hasInvalidInput(inputList) {
  //if not every inputElement inside the inputlist is valid, return true and state this form has InvalidInput
  return !inputList.every((inputElement) => inputElement.validity.valid);
}
*/
/*
//this function is called in the ToggleButtonState function
function disableButton(submitButton, { inactiveButtonClass }) {
  //grab the submit button and add the inactive button class to it.
  submitButton.classList.add(inactiveButtonClass);
  //make the button disabled class true
  submitButton.disabled = true;
}*/

/*//this function is used in the toggleButtonState if the input is valid
function enableButton(submitButton, { inactiveButtonClass }) {
  //remove the inactiveButtonClass from the submit button
  submitButton.classList.remove(inactiveButtonClass);
  //make the button disabled class false
  submitButton.disabled = false;
}*/
/*
//this function is called inside the setEventListeners
function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  //when you run the function toggleButtonState, you run the hasInvalidInput() function and give it the inputElement sent earlier
  //if it has invalidInput, we return the function disableButton, and pass in the submitButton and inactivebuttonclass to use
  if (hasInvalidInput(inputElements)) {
    return disableButton(submitButton, { inactiveButtonClass });
  }
  //if there is No invalid input, run the enableButton function
  enableButton(submitButton, { inactiveButtonClass });
}
*/
/*//this is called inside the enableValidation function
function setEventListeners(formElement, options) {
  //call the options our "input selector"?
  const { inputSelector } = options;
  //search the formElement, all the modal forms, in the page for all their input and give that a name
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  //find the submit button by searching the form, looking in the options for the the button
  const submitButton = formElement.querySelector(options.submitButtonSelector);

  //call the toggleButtonState function and pass in the input, submit button, and options
  toggleButtonState(inputElements, submitButton, options);

  //for each input, add an event listener that checks for any input
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      //if anything is input, run the form checkInputValidity to check the validity of the element, make sure to pass in the form, input, and options
      checkInputValidity(formElement, inputElement, options);
      //if anything is input, run the toggleButtonState function, passing in the same information
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}*/

/*function enableValidation(options) {
  //finds all the "modal__form" elements in the webpage and calls it formElements
  const formElements = [...document.querySelectorAll(options.formSelector)];
  //for each Form Element on the webpage, we add an event listener for a submit event
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      //prevent the default refresh of the page
      evt.preventDefault();
    });

    //call the setEventListeners function and pass in the form element along with the EnableValidation options
    setEventListeners(formElement, options);
  });
}*/
/*
enableValidation({
  // this is options, ways we can grab the main elements we'll use to validate our forms - we have to pass this to the validator once it's made
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});*/
