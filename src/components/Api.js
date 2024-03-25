export default class Api {
  constructor(data) {
    this._authorization = "0863e235-ec04-4229-a6bf-890245ffa3f4";
  }

  /*uploadInitialCards(data) {
    console.log(data);
    data.forEach((data) => {
      this.uploadCard(data);
    });
  }*/

  uploadCard({ name, link }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! Error: ${res.status}`)
    );
  }

  fetchCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! Error: ${res.status}`)
    );
  }

  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! Error: ${res.status}`)
    );
  }

  changeUserInfo({ name, about }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! Error: ${res.status}`)
    );
  }

  changeUserAvatar(avatarLink) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatarLink,
        }),
      }
    ).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! Error: ${res.status}`)
    );
  }

  deleteCard(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
      }
    ).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! Error: ${res.status}`)
    );
  }

  cardLike(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
      }
    ).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Uh oh! Error: ${res.status}`).then((response) =>
            console.log(response)
          )
    );
  }

  cardUnlike(id) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${id}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
      }
    ).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Uh oh! Error: ${res.status}`).then((response) =>
            console.log(response)
          )
    );
  }
}
