export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      ...this.headers,
    'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  patchUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  postCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this.getHeaders(),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  patchAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        avatar: avatar.url,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });

  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  // baseUrl: 'https://api.mestoproject.students.nomoredomains.icu',
  headers: {
    // authorization: 'dc3c97d1-1035-4b28-91f1-6584655ffbcb',
    // 'Content-Type': 'application/json'
  }
})