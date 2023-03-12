const apiInfoConfig = {
    url: 'https://nomoreparties.co/v1/cohort-60',
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

export {validationConfig, apiInfoConfig};