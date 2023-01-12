const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__inactive-button',
    redBorderClass: 'popup__input_red-broder'
}

function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(config.redBorderClass);
}

function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.redBorderClass);
}

function checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

function disableSubmitButton(buttonElement, config) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}

function enableSubmitButton(buttonElement, config) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, config);
    } else {
        enableSubmitButton(buttonElement, config);
    }
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.buttonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
}

function checkErrors(element) {
    const inputList = Array.from(element.querySelectorAll(validationConfig.inputSelector));
    const inputsErrorState = Array.from(element.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = element.querySelector(validationConfig.buttonSelector);
    inputsErrorState.forEach((input) => {
        toggleButtonState(inputList, buttonElement, validationConfig);
        checkInputValidity(element, input, validationConfig);
    });
};


