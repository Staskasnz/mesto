import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, submit, loading) {
        super(selector);
        this._submit = submit;
        this._loading = loading;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const values = {};
        this._inputList.forEach((item) => {    
            values[item.id] = item.value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._loading(true, this._popupForm);
            this._submit(this._getInputValues(), this._popupForm);
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}