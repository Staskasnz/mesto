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
const popupFullImage = document.querySelector('.popup_full-image');
const popupImage = document.querySelector('.popup__img');
const buttonCloseFullImagePopup = document.querySelector('.popup__close-button_full-image');
const popupImageTitle = document.querySelector('.popup__img-title');
const photoGridTemplate = document.querySelector('#photo-grid__element').content;

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createPhotoGridElement(name, link) {
    const photoGridElement = photoGridTemplate.querySelector('.photo-grid__element').cloneNode(true);
    const photoGridPhoto = photoGridElement.querySelector('.photo-grid__photo');
    photoGridElement.querySelector('.photo-grid__title').textContent = name;
    photoGridPhoto.alt = name;
    photoGridPhoto.src = link;
    photoGridElement.querySelector('.photo-grid__like').addEventListener('click', like);
    photoGridElement.querySelector('.photo-grid__delete-button').addEventListener('click', deleteElement);
    photoGridPhoto.addEventListener('click', () => {
        popupImage.src = link;
        popupImageTitle.textContent = name;
        popupImage.alt = name;
        popupOpen(popupFullImage);
    });
    return photoGridElement;
}

function popupOpen(popup) {
    popup.classList.add('popup_opened');
}

function popupClose(popup) {
    popup.classList.remove('popup_opened');
}

function popupSave(evt) {
    evt.preventDefault();
}

function like(evt) {
    evt.target.classList.toggle('photo-grid__like_active');
}

function deleteElement(evt) {
    evt.target.closest('.photo-grid__element').remove();
}

editButton.addEventListener('click', () => {
    popupOpen(popupEdit);
    inputName.value = profileName.textContent;
    inputVocation.value = profileVocation.textContent;
});

addButton.addEventListener('click', () => {
    popupOpen(popupAdd);
    inputTitle.value = '';
    inputLink.value = '';
});

buttonCloseEditPopup.addEventListener('click', () => { popupClose(popupEdit); });
buttonCloseAddPopup.addEventListener('click', () => { popupClose(popupAdd); });
buttonCloseFullImagePopup.addEventListener('click', () => { popupClose(popupFullImage); });
popupEditForm.addEventListener('submit', (evt) => {
    popupSave(evt);
    profileName.textContent = inputName.value;
    profileVocation.textContent = inputVocation.value;
    popupClose(popupEdit);
});

popupAddForm.addEventListener('submit', (evt) => {
    popupSave(evt);
    photoGridElement = createPhotoGridElement(inputTitle.value, inputLink.value);
    photoGrid.prepend(photoGridElement);
    popupClose(popupAdd);
});

initialCards.forEach((item) => {
    photoGridElement = createPhotoGridElement(item.name, item.link)
    photoGrid.append(photoGridElement);
});