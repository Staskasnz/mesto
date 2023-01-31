class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }

    _hideInputError(formElement, inputElement, config) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(config.redBorderClass);
    }
    
    _showInputError(formElement, inputElement, config) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(config.redBorderClass);
    }
    
    _checkInputValidity(formElement, inputElement, config) {
        if (inputElement.validity.valid) {
            this._hideInputError(formElement, inputElement, config);
        } else {
            this._showInputError(formElement, inputElement, config);
        }
    }
    
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _disableSubmitButton(buttonElement, config) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    
    _enableSubmitButton(buttonElement, config) {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }

    _toggleButtonState(inputList, buttonElement, config) {
        if (this._hasInvalidInput(inputList)) {
            this._disableSubmitButton(buttonElement, config);
        } else {
            this._enableSubmitButton(buttonElement, config);
        }
    }

    _setEventListeners(formElement, config) {
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.buttonSelector);
        this._toggleButtonState(inputList, buttonElement, config);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, config);
                this._toggleButtonState(inputList, buttonElement, config);
            });
        });
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._config.formSelector));
        formList.forEach((formElement) => {
            this._setEventListeners(formElement, this._config);
        });
    }

    checkErrors() {
            const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
            const inputsErrorState = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
            const buttonElement = this._formElement.querySelector(this._config.buttonSelector);
            this._toggleButtonState(inputList, buttonElement, this._config);
            inputsErrorState.forEach((input) => {
                this._hideInputError(this._formElement, input, this._config);
            });
        };
        
}

export default FormValidator;