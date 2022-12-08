let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input_type_name');
let inputVocation = document.querySelector('.popup__input_type_vocation');
let profileName = document.querySelector('.profile__name');
let profileVocation = document.querySelector('.profile__vocation');
let saveButton = document.querySelector('.popup__save-button');
let popupForm = document.querySelector('.popup__form');

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupSave);

function popupOpen() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputVocation.value = profileVocation.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}


function popupSave(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileVocation.textContent = inputVocation.value;
    popupClose();
}