import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImage = this._popup.querySelector('.popup__img');
        this._popupImageTitle = this._popup.querySelector('.popup__img-title')
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageTitle.textContent = name;
        super.open();
    }
}