import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, submit) {
        super(selector);
        this._submit = submit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._button = this._popupForm.querySelector('.popup__save-button');
    }

    _getInputValues() {
        const values = {};
        this._inputList.forEach((item) => {    
            values[item.id] = item.value;
        });
        return values;
    }

    renderLoading(isLoading, message){
        if (isLoading) {
            this._button.textContent = `${message}`;
        } else {
            this._button.textContent = `${message}`;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true, 'Сохранение...');
            this._submit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}