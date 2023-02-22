import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { validationConfig, initialCards } from "../constants/constants.js";
import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const popupEditForm = document.querySelector('.popup__edit-form');
const popupAddForm = document.querySelector('.popup__add-form');
const photoGrid = document.querySelector('.photo-grid');
const inputName = document.querySelector('#name');
const inputVocation = document.querySelector('#vocation');

const validationAddForm = new FormValidator(validationConfig, popupAddForm);
const validationEditForm = new FormValidator(validationConfig, popupEditForm);

const cardsGrid = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item.name, item.link);
        cardsGrid.addItem(card.getView());
    },
},
    '.photo-grid'
);

const userInfo = new UserInfo({
    name: profileName,
    vocation: profileVocation
});

const popupEdit = new PopupWithForm('.popup_edit', handleSubmitPopupEdit);

const popupAdd = new PopupWithForm('.popup_add', handleSubmitPopupAdd);

const popupFullImage = new PopupWithImage('.popup_full-image');

function handleSubmitPopupEdit(inputData) {
    userInfo.setUserInfo(inputData);
}

function handleSubmitPopupAdd(inputData) {
    const card = createCard(inputData.title, inputData.link);
    cardsGrid.addItem(card.getView())
}

function openFullImagePopup(name, link) {
    popupFullImage.open(name, link);
}

function createCard(name, link) {
    const card = new Card(name, link, openFullImagePopup, '#photo-grid__element');
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

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupFullImage.setEventListeners();

cardsGrid.renderItems();

validationAddForm.enableValidation();
validationEditForm.enableValidation();