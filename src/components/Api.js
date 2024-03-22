export default class Api {
  //All your requests should be methods of this class:
  constructor(data) {
    //this._baseUrl = "https://around-api.en.tripleten-services.com/v1/";
    //this._id = data.id;
    //this._body = data.body;
    this._authorization = "0863e235-ec04-4229-a6bf-890245ffa3f4";
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! ERror: ${res.status}`)
    );
  }

  uploadCard() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Santorini",
        link: "http://example.com", //this works when outlining the specifics of the post
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! ERror: ${res.status}`)
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
      res.ok ? res.json() : Promise.reject(`Uh oh! ERror: ${res.status}`)
    );
  }

  changeUserInfo() {}
}

/*makeGetRequest() {
    return fetch(this._url, {
      method: this._methodType,
      headers: {
        authorization: "0863e235-ec04-4229-a6bf-890245ffa3f4",
        "Content-Type": this._contentType,
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Uh oh! ERror: ${res.status}`)
    );
  }*/

/*makePostRequest() {
    return fetch(this._url, {
      method: this._methodType,
      headers: {
        authorization: "0863e235-ec04-4229-a6bf-890245ffa3f4",
        "Content-Type": this._contentType,
      },
      body: this._body,
    });
    //    .then((res) =>
    //      res.ok ? res.json : Promise.reject(`Uh oh! ERror: ${res.status}`)
    //    )
    //    .then((response) => console.log(response))
    //    .catch((err) => console.error(err));
  }
*/
// Cards should be rendered after the user information is received from the server.
//Сreate a function in Api.js and return the Promise.all() method.
//Pass the array of function calls for getting user information
//and the list of cards to Promise.all() as a parameter.

// other methods for working with the API
