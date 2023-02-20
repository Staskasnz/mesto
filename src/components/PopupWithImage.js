import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._popupImage = selector.querySelector('.popup__img');
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._selector.querySelector('.popup__img-title').textContent = name;
        super.open();
    }
}