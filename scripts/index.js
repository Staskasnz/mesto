const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup__edit');
const popupAdd = document.querySelector('.popup__add');
const editFormcCloseButton = document.querySelector('.edit-form__close-button');
const addFormCloseButton = document.querySelector('.add-form__close-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputVocation = document.querySelector('.popup__input_type_vocation');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const popupEditForm = document.querySelector('.popup__edit-form');
const popupAddForm = document.querySelector('.popup__add-form');
const photoGrid = document.querySelector('.photo-grid');
const fullImage = document.querySelector('.full-image');
const fullImagePopup = document.querySelector('.full-image__popup');
const fullImageCloseButton = document.querySelector('.full-image__close-button');
const fullImageTitle = document.querySelector('.full-image__title');
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

initialCards.forEach((item) => {
    const photoGridElement = photoGridTemplate.querySelector('.photo-grid__element').cloneNode(true);
    const photoGridPhoto = photoGridElement.querySelector('.photo-grid__photo');
    photoGridElement.querySelector('.photo-grid__title').textContent = item.name;
    photoGridPhoto.src = item.link;
    photoGridElement.querySelector('.photo-grid__like').addEventListener('click', like);
    photoGridElement.querySelector('.photo-grid__delete-button').addEventListener('click', deleteElement);
    photoGridPhoto.addEventListener('click', popupOpen);
    photoGrid.append(photoGridElement);
});

editButton.addEventListener('click', popupOpen);
addButton.addEventListener('click', popupOpen);
editFormcCloseButton.addEventListener('click', popupClose);
addFormCloseButton.addEventListener('click', popupClose);
fullImageCloseButton.addEventListener('click', popupClose);
popupEditForm.addEventListener('submit', popupSave);
popupAddForm.addEventListener('submit', popupSave);


function popupOpen(evt) {
    if (evt.target.className === 'profile__edit-button' || evt.target.className === 'profile__pencil') {
        popupEdit.classList.add('popup_opened');
        inputName.value = profileName.textContent;
        inputVocation.value = profileVocation.textContent;
    } else if (evt.target.className === 'profile__add-button' || evt.target.className === 'profile__plus') {
        popupAdd.classList.add('popup_opened');
        inputTitle.value = '';
        inputLink.value = '';
    } else {
        fullImagePopup.src = evt.target.src;
        fullImageTitle.textContent = evt.path[1].children[2].children[0].textContent;
        fullImage.classList.add('popup_opened');
    }
}

function popupClose(evt) {
    if (evt.target.className.includes('edit-form__close-button') || evt.target.className.includes('popup__edit-form')) {
        popupEdit.classList.remove('popup_opened');
    } else if (evt.target.className.includes('add-form__close-button') || evt.target.className.includes('popup__add-form')){
        popupAdd.classList.remove('popup_opened');
    } else {
        fullImage.classList.remove('popup_opened');
    }
}

function popupSave(evt) {
    evt.preventDefault();
    if (evt.target.className.includes('popup__edit-form')) {
        profileName.textContent = inputName.value;
        profileVocation.textContent = inputVocation.value;
    } else {
        const photoGridElement = photoGridTemplate.querySelector('.photo-grid__element').cloneNode(true);
        const photoGridPhoto = photoGridElement.querySelector('.photo-grid__photo');
        photoGridElement.querySelector('.photo-grid__title').textContent = inputTitle.value;
        photoGridElement.querySelector('.photo-grid__photo').src = inputLink.value;
        photoGridElement.querySelector('.photo-grid__like').addEventListener('click', like);
        photoGridElement.querySelector('.photo-grid__delete-button').addEventListener('click', deleteElement);
        photoGridPhoto.addEventListener('click', popupOpen);
        photoGrid.prepend(photoGridElement);
    }
    popupClose(evt);
}

function like(evt) {
    evt.target.classList.toggle('photo-grid__like_active');
}

function deleteElement(evt) {
    evt.target.closest('.photo-grid__element').remove();
}