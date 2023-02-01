class Card {
    constructor(title, link, openFullImagePopup, photoGridTemplate) {
        this._title = title;
        this._link = link;
        this._photoGridTemplate = photoGridTemplate;
        this._openFullImagePopup = openFullImagePopup;
    }

    _getTemplateCard() {
        const card = this._photoGridTemplate.querySelector(".photo-grid__element").cloneNode(true);

        return card;
    }

    _deleteCard(){
        this._newCard.remove();
    }

    _putlLike(){
        this._like.classList.toggle('photo-grid__like_active');
    }

    _setEventListeners(){
        this._like.addEventListener('click', () => this._putlLike()); 
        this._newCard.querySelector('.photo-grid__delete-button').addEventListener('click', () => this._deleteCard());
        this._img.addEventListener('click', () => this._openFullImagePopup(this._title, this._link));
    }

    _setData(){
        const title = this._newCard.querySelector('.photo-grid__title');
        title.textContent = this._title;
        this._img.src = this._link;
        this._img.alt = this._title;
    }

    getView() {
        this._newCard = this._getTemplateCard();
        this._img = this._newCard.querySelector('.photo-grid__photo');
        this._like = this._newCard.querySelector('.photo-grid__like');
        this._setEventListeners();
        this._setData();
    
        return this._newCard;
      }
}

export default Card;