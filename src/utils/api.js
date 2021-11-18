const customFetch = (url, headers) => {
  return fetch(url, headers)
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
}

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  createCard(data) {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  deleteCard(cardId) {
    return customFetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
  }

  addLike(cardId) {
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'PUT',
    })
  }

  deleteLike(cardId) {
    return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
  }

  updateAvatar(avatar) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    })
  }

  setUserData(name, job) {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: `${name}`,
        about: `${job}`
      })
    })
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e3c1d69b-5d6d-4954-a353-d1cd5804394f",
    "Content-Type": "application/json"
  }
});