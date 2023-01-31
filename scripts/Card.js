class Card {
    constructor(title, link, openPopup) {
        this._title = title;
        this._link = link;
        this._openPopup = openPopup;
    }

    _getTemplateCard() {
        const card = document
            .querySelector("#photo-grid__element")
            .content.querySelector(".photo-grid__element")
            .cloneNode(true);

        return card;
    }

    _deleteCard(){
        this._newCard.remove();
    }

    _putlLike(){
        this._newCard.querySelector('.photo-grid__like').classList.toggle('photo-grid__like_active');
    }

    _openFullImage(){
        const popupImage = document.querySelector('.popup__img');
        const popupImageTitle = document.querySelector('.popup__img-title');
        const popupFullImage = document.querySelector('.popup_full-image');
        popupImage.src = this._link;
        popupImage.alt = this._title;
        popupImageTitle.textContent = this._title;
        this._openPopup(popupFullImage);
    }

    _setEventListeners(){
        this._newCard.querySelector('.photo-grid__like').addEventListener('click', () => this._putlLike()); 
        this._newCard.querySelector('.photo-grid__delete-button').addEventListener('click', () => this._deleteCard());
        this._newCard.querySelector('.photo-grid__photo').addEventListener('click', () => this._openFullImage());
    }

    _setData(){
        const title = this._newCard.querySelector('.photo-grid__title');
        title.textContent = this._title;
        const img = this._newCard.querySelector('.photo-grid__photo');
        img.src = this._link;
        img.alt = this._title;
    }

    getView() {
        this._newCard = this._getTemplateCard();
        this._setEventListeners();
        this._setData();
    
        return this._newCard;
      }
}

export default Card;