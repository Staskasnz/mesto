let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let inputName = document.querySelector('.popup__input-name');
let inputVocation = document.querySelector('.popup__input-vocation');
let profileName = document.querySelector('.profile__name');
let profileVocation = document.querySelector('.profile__vocation');
let saveButton = document.querySelector('.popup__save-button');
let popupForm = document.querySelector('.popup__form');

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupOpen);
popupForm.addEventListener('submit', popupSave); 

function popupOpen(){
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')){
        inputName.value = profileName.textContent;
        inputVocation.value = profileVocation.textContent;
    }
}

function popupSave(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileVocation.textContent = inputVocation.value;
    popupOpen();
}

