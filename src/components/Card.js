export default class Card {
    constructor(title, link, likes, id, ownerId, userId, openFullImagePopup, openDeleteCardPopup, putLikeApi, deleteLikeApi, templateSelector) {
        this._title = title;
        this._link = link;
        this._likes = likes;
        this._id = id;
        this._ownerId = ownerId;
        this._openFullImagePopup = openFullImagePopup;
        this._openDeleteCardPopup = openDeleteCardPopup;
        this._putLikeApi = putLikeApi;
        this._deleteLikeApi = deleteLikeApi;
        this._templateSelector = templateSelector;
        this._content = document.querySelector(this._templateSelector).content
            .querySelector(".photo-grid__element");
        this._myId = userId;
    }

    _getTemplateCard() {
        const card = this._content.cloneNode(true);
        return card;
    }

    _putLike() {
        this._putLikeApi(this._id, this._likesCount, this._like);
    }

    _deleteLike() {
        this._deleteLikeApi(this._id, this._likesCount, this._like);
    }

    deleteCard2() {
        this._newCard.remove();
    }

    _setEventListeners() {
        this._like.addEventListener('click', () => {
            if (this._like.classList.contains('photo-grid__like_active')) {
                this._deleteLike();
            } else {
                this._putLike();
            }
        });
        this._newCard.querySelector('.photo-grid__delete-button').addEventListener('click', () => this._openDeleteCardPopup(this._newCard, this._id));
        this._img.addEventListener('click', () => this._openFullImagePopup(this._title, this._link));
    }

    _setData() {
        const title = this._newCard.querySelector('.photo-grid__title');
        title.textContent = this._title;
        this._img.src = this._link;
        this._img.alt = this._title;
        this._likesCount.textContent = this._likes.length;
    }

    _checkId() {
        let result;
        this._likes.forEach((item) => {
            if (item._id === this._myId) {
                result = true;
            } else {
                result = false;
            }
        });
        return result;
    }

    getView() {
        this._newCard = this._getTemplateCard();
        this._img = this._newCard.querySelector('.photo-grid__photo');
        this._like = this._newCard.querySelector('.photo-grid__like');
        this._likesCount = this._newCard.querySelector('.photo-grid__likes-counter');
        this._setEventListeners();
        this._setData();

        if (this._myId !== this._ownerId) {
            this._newCard.querySelector('.photo-grid__delete-button').remove();
        }
        
        if (this._checkId()) {
            this._like.classList.add('photo-grid__like_active');
        }

        return this._newCard;
    }
}