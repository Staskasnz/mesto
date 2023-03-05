export default class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getInfo() {
        return fetch(this.url, {
            headers: this.headers
        })
            .then(handleResponse)
    }

    saveInfo(data) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: {
                authorization: 'dacb1343-5ee5-4c35-990d-5bf7b2f7cc79',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.vocation
            })
        })
            .then(handleResponse)
    }

    setAvatar(data) {
        return fetch(`${this.url}/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: 'dacb1343-5ee5-4c35-990d-5bf7b2f7cc79',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(handleResponse)
    }

    createNewCard(data) {
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
            .then(handleResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this.url}/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(handleResponse)
    }

    putLike(cardId) {
        return fetch(`${this.url}/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(handleResponse)
    }

    deleteLike(cardId) {
        return fetch(`${this.url}/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(handleResponse)
    }
}

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(new Error('Ошибка!!!'))
}