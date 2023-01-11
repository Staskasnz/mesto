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

function toggleButtonState(inputList, buttonElement, config){
if(hasInvalidInput(inputList)){
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
} else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
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

function disableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));          //составляем массив форм
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); //составляем массив инпутов
        const buttonElement = formElement.querySelector(config.buttonSelector);
        buttonElement.classList.remove(config.inactiveButtonClass);                       //убираем класс неактивной кнопки в форме
        buttonElement.disabled = false;                                                   //убираем атрибут дизейбл в форме
        inputList.forEach((inputElement) => {                                             //идем по импутам в форме                      
            hideInputError(formElement, inputElement, config);                            //убираем все ошибки инпутов
        });
    });
}