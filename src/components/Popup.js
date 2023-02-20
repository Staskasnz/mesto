export default class Popup {
    constructor(selector) {
        this._selector = selector;
    }

    open() {
        this._selector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._selector.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
        this._selector.querySelector('.popup__overlay').addEventListener('click', this.close.bind(this));
    }
}