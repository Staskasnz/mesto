import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
    constructor(selector, handleButton){
        super(selector);
        this._handleButton = handleButton;
    }

    open(card, id){
        this._card = card;
        this._id = id;
        super.open();
    }

    delete(){
        this._handleButton(this._id);
        this._card.remove();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__delete-card-button').addEventListener('click', () => {
            this.close();
            this.delete();
        });
    }
}