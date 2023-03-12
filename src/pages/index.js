import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { validationConfig, apiInfoConfig} from "../constants/constants.js";
import './index.css';
import PopupWithButton from "../components/PopupWithButton.js";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatar = document.querySelector('.profile__avatar-pencil');
const popupEditForm = document.querySelector('.popup__edit-form');
const popupAddForm = document.querySelector('.popup__add-form');
const popupAvatarForm = document.querySelector('.popup__avatar-form');
const inputName = document.querySelector('#name');
const inputVocation = document.querySelector('#vocation');

const validationAddForm = new FormValidator(validationConfig, popupAddForm);
const validationEditForm = new FormValidator(validationConfig, popupEditForm);
const validationAvatarForm = new FormValidator(validationConfig, popupAvatarForm);

const api = new Api(apiInfoConfig);

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    vocationSelector: '.profile__vocation',
    avatarSelector: '.profile__avatar'
});

let userId;

const cardsGrid = new Section({
    renderer: (item) => {
        const card = createCard(item.name, item.link, item.likes, item._id, item.owner._id, userId);
        cardsGrid.addItem(card);
    },
},
    '.photo-grid'
);

Promise.all([ 
    api.getUserInfo(),
    api.getCardInfo()
])
    .then((values) => {
        userId = values[0]._id;
        userInfo.setUserInfo(values[0]);
        userInfo.setAvatar(values[0]);
        cardsGrid.renderItems(values[1]);
    })
    .catch((err) => {
        console.log(err);
    })

const popupEdit = new PopupWithForm('.popup_edit', handleSubmitPopupEdit);
const popupAdd = new PopupWithForm('.popup_add', handleSubmitPopupAdd);
const popupSetAvatar = new PopupWithForm('.popup_avatar', handleSubmitPopupAvatar);
const popupFullImage = new PopupWithImage('.popup_full-image');
const popupDeleteCard = new PopupWithButton('.popup_delete', handleButton);

function handleSubmitPopupEdit(inputData) {
    api.saveUserInfo(inputData)
        .then((data) => {
            userInfo.setUserInfo(data);
            popupEdit.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupEdit.renderLoading(false, 'Сохранить');
        });
}

function handleSubmitPopupAdd(inputData) {
    api.createNewCard(inputData)
        .then((data) => {
            const card = createCard(data.name, data.link, data.likes, data._id, data.owner._id, userId);
            cardsGrid.addItem(card);
            popupAdd.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupAdd.renderLoading(false, 'Создать');
        });
}

function handleSubmitPopupAvatar(inputData) {
    api.setAvatar(inputData)
        .then((data) => {
            userInfo.setAvatar(data);
            popupSetAvatar.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            popupSetAvatar.renderLoading(false, 'Сохранить');
        });
}

function handleButton(cardId, card) {
    api.deleteCard(cardId)
        .then(() => {
            popupDeleteCard.close();
            card.removeCard();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
}

function putLikeApi(cardId, card) {
    api.putLike(cardId)
        .then((data) => {
            card.updateCountLikes(data.likes.length);
            card.likeIsActive();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
}

function deleteLikeApi(cardId, card) {
    api.deleteLike(cardId)
        .then((data) => {
            card.updateCountLikes(data.likes.length);
            card.likeIsInactive();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
}

function openFullImagePopup(name, link) {
    popupFullImage.open(name, link);
}

function openDeleteCardPopup(card, id) {
    popupDeleteCard.open(card, id);
}

function createCard(name, link, likes, id, ownerId, userId) {
    const card = new Card(name, link, likes, id, ownerId, userId, openFullImagePopup, openDeleteCardPopup, putLikeApi, deleteLikeApi, '#photo-grid__element');
    return card.getView();
}

editButton.addEventListener('click', () => {
    const userObject = userInfo.getUserInfo();
    inputName.value = userObject.name;
    inputVocation.value = userObject.vocation;
    validationEditForm.clearErrors();
    popupEdit.open();
});

addButton.addEventListener('click', () => {
    validationAddForm.clearErrors();
    popupAdd.open();
});

avatar.addEventListener('click', () => {
    validationAvatarForm.clearErrors();
    popupSetAvatar.open();
});

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupFullImage.setEventListeners();
popupDeleteCard.setEventListeners();
popupSetAvatar.setEventListeners();

validationAddForm.enableValidation();
validationEditForm.enableValidation();
validationAvatarForm.enableValidation();