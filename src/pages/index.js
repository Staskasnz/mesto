import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { validationConfig, userInfoConfig, cardsConfig } from "../constants/constants.js";
import './index.css';
import PopupWithButton from "../components/PopupWithButton.js";

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatar = document.querySelector('.profile__avatar-pencil');
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const popupEditForm = document.querySelector('.popup__edit-form');
const popupAddForm = document.querySelector('.popup__add-form');
const popupAvatarForm = document.querySelector('.popup__avatar-form');
const inputName = document.querySelector('#name');
const inputVocation = document.querySelector('#vocation');
const profileAvatar = document.querySelector('.profile__avatar');

const validationAddForm = new FormValidator(validationConfig, popupAddForm);
const validationEditForm = new FormValidator(validationConfig, popupEditForm);
const validationAvatarForm = new FormValidator(validationConfig, popupAvatarForm);

const userApi = new Api(userInfoConfig);
const cardsApi = new Api(cardsConfig);

const userInfo = new UserInfo({
    name: profileName,
    vocation: profileVocation
});

let cardsGrid;

cardsApi.getInfo()
    .then((data) => {
        cardsGrid = new Section({
            items: data,
            renderer: (item) => {
                const card = createCard(item.name, item.link, item.likes, item._id, item.owner._id);
                cardsGrid.addItem(card.getView());
            },
        },
            '.photo-grid'
        );
        cardsGrid.renderItems();
    }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });


userApi.getInfo()
    .then((data) => {
        userInfo.setUserInfo(data);
        profileAvatar.src = data.avatar;
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

const popupEdit = new PopupWithForm('.popup_edit', handleSubmitPopupEdit, renderLoading);
const popupAdd = new PopupWithForm('.popup_add', handleSubmitPopupAdd, renderLoading);
const popupSetAvatar = new PopupWithForm('.popup_avatar', handleSubmitPopupAvatar, renderLoading);
const popupFullImage = new PopupWithImage('.popup_full-image');
const popupDeleteCard = new PopupWithButton('.popup_delete', handleButton);

function renderLoading(isLoading, popupForm) {
    if (isLoading) {
        popupForm.querySelector('.popup__save-button').textContent = 'Сохранение...';
    } else {
        popupForm.querySelector('.popup__save-button').textContent = 'Создать';
    }
}

function handleSubmitPopupEdit(inputData, popupForm) {
    userApi.saveInfo(inputData)
        .then((data) => {
            userInfo.setUserInfo(data);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(false, popupForm);
            popupEdit.close();
        });
}

function handleSubmitPopupAdd(inputData, popupForm) {
    cardsApi.createNewCard(inputData)
        .then((data) => {
            const card = createCard(data.name, data.link, data.likes, data._id, data.owner._id);
            cardsGrid.addItem(card.getView())
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(false, popupForm);
            popupAdd.close();
        });
}

function handleSubmitPopupAvatar(inputData, popupForm) {
    userApi.setAvatar(inputData)
        .then((data) => {
            profileAvatar.src = data.avatar;
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(false, popupForm);
            popupSetAvatar.close();
        });
}

function handleButton(cardId) {
    cardsApi.deleteCard(cardId);
}

function putLikeApi(cardId) {
    return cardsApi.putLike(cardId);
}

function deleteLikeApi(cardId) {
    return cardsApi.deleteLike(cardId);
}

function openFullImagePopup(name, link) {
    popupFullImage.open(name, link);
}

function openDeleteCardPopup(card, id) {
    popupDeleteCard.open(card, id);
}

function createCard(name, link, likes, id, ownerId) {
    const card = new Card(name, link, likes, id, ownerId, openFullImagePopup, openDeleteCardPopup, putLikeApi, deleteLikeApi, '#photo-grid__element');
    return card;
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