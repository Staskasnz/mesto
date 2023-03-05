const userInfoConfig = {
    url: 'https://nomoreparties.co/v1/cohort-60/users/me',
    headers: {
        authorization: 'dacb1343-5ee5-4c35-990d-5bf7b2f7cc79'
      }
}

const cardsConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-60/cards',
    headers: {
        authorization: 'dacb1343-5ee5-4c35-990d-5bf7b2f7cc79',
        'Content-Type': 'application/json'
    }
}

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__inactive-button',
    redBorderClass: 'popup__input_red-broder'
}

export {validationConfig, userInfoConfig, cardsConfig};