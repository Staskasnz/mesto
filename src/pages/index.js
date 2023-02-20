import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { validationConfig, initialCards } from "../components/constants.js";
import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const selectorEditPopup = document.querySelector('.popup_edit');
const selectorAddPopup = document.querySelector('.popup_add');
const selectorFullImagePopup = document.querySelector('.popup_full-image');
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

const userObject = userInfo.getUserInfo();

const popupEdit = new PopupWithForm(selectorEditPopup, () => {
    handleSubmitEditPopup(userObject);
});

const popupAdd = new PopupWithForm(selectorAddPopup, () => {
    const card = createCard(inputTitle.value, inputLink.value);
    photoGrid.prepend(card.getView());
});

const popupFullImage = new PopupWithImage(selectorFullImagePopup);

function handleSubmitEditPopup(userObject){
    userObject.name = inputName.value;
    userObject.vocation = inputVocation.value;
    userInfo.setUserInfo(userObject);
}

function openFullImagePopup(name, link) {
    popupFullImage.open(name, link);
}

function createCard(name, link) {
    const card = new Card(name, link, openFullImagePopup, '#photo-grid__element');
    return card;
}

editButton.addEventListener('click', () => {
    inputName.value = userObject.name;
    inputVocation.value = userObject.vocation;
    userInfo.setUserInfo(userObject);
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