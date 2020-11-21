export class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _handleCheck(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
        .then(this._handleCheck)
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then(this._handleCheck);
    }
  
    patchUserInfo(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about,
        }),
      }).then(this._handleCheck);
    }
  
    postCard(newCard) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: newCard.name,
          link: newCard.link,
        }),
      }).then(this._handleCheck);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._handleCheck);
    }
  
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: this._headers,
      }).then(this._handleCheck);
    }
  
    patchAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar/`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar.url ,
        }),
      }).then(this._handleCheck);
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
      authorization: 'dc3c97d1-1035-4b28-91f1-6584655ffbcb',
      'Content-Type': 'application/json'
    }
  })