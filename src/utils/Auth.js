import React from "react";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this._address = props.baseUrl;
    this._headers = props.headers;
  }

  _getRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  register(password, email) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._getRes);
  }

  login(password, email) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._getRes);
  }

  checkToken(jwt) {
    console.log(jwt);
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
        // `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzcyNjE1NGQ0NTY3YzAwMTMxZTMyNTgiLCJpYXQiOjE2Njg0NDE3MjJ9.CP33r0bR6kpY2WHnYJBc4tfzsmYi2ANoscrGo1aNhO4`,
      },
    }).then(this._getRes);
  }
}

const AuthX = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AuthX;
