class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.buttonSelector);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = '';
        inputElement.classList.remove(this._config.redBorderClass);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._config.redBorderClass);
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _disableSubmitButton() {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._config.formSelector));
        formList.forEach(() => {
            this._setEventListeners();
        });
    }

    clearErrors() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._formElement.querySelector(this._config.buttonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((input) => {
            this._hideInputError(input);
        });
    };

}

export default FormValidator;