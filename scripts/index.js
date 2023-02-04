import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {validationConfig, initialCards} from "./constants.js";

const popupOverlayEdit = document.querySelector('.popup__overlay_edit');
const popupOverlayAdd = document.querySelector('.popup__overlay_add');
const popupOverlayFullImage = document.querySelector('.popup__overlay_full-image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const buttonCloseEditPopup = document.querySelector('.popup__close-button_edit-form');
const buttonCloseAddPopup = document.querySelector('.popup__close-button_add-form');
const inputName = document.querySelector('.popup__input_type_name');
const inputVocation = document.querySelector('.popup__input_type_vocation');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const popupEditForm = document.querySelector('.popup__edit-form');
const popupAddForm = document.querySelector('.popup__add-form');
const photoGrid = document.querySelector('.photo-grid');
const popupImage = document.querySelector('.popup__img');
const popupImageTitle = document.querySelector('.popup__img-title');
const popupFullImage = document.querySelector('.popup_full-image');
const buttonCloseFullImagePopup = document.querySelector('.popup__close-button_full-image');

const validationAddForm = new FormValidator(validationConfig, popupAddForm);
const validationEditForm = new FormValidator(validationConfig, popupEditForm);

function clickEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', clickEscape);
}

function openFullImagePopup(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageTitle.textContent = name;
    openPopup(popupFullImage);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', clickEscape);
}

function createCard(name, link) {
    const card = new Card(name, link, openFullImagePopup, '#photo-grid__element');
    
    return card;
}

editButton.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputVocation.value = profileVocation.textContent;
    validationEditForm.clearErrors();
    openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
    popupAddForm.reset();
    validationAddForm.clearErrors();
    openPopup(popupAdd);
});

popupOverlayAdd.addEventListener('click', () => { closePopup(popupAdd); });
popupOverlayEdit.addEventListener('click', () => { closePopup(popupEdit); });
popupOverlayFullImage.addEventListener('click', () => { closePopup(popupFullImage); });
buttonCloseEditPopup.addEventListener('click', () => { closePopup(popupEdit); });
buttonCloseAddPopup.addEventListener('click', () => { closePopup(popupAdd); });
buttonCloseFullImagePopup.addEventListener('click', () => { closePopup(popupFullImage); });

popupEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileVocation.textContent = inputVocation.value;
    closePopup(popupEdit);
});

popupAddForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const card = createCard(inputTitle.value, inputLink.value);
    photoGrid.prepend(card.getView());
    closePopup(popupAdd);
});

initialCards.forEach((item) => {
    const card = createCard(item.name, item.link);
    photoGrid.append(card.getView());
});

validationAddForm.enableValidation();
validationEditForm.enableValidation();