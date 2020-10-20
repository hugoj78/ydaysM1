import jwtDecode from 'jwt-decode';

const url = 'http://localhost:3030/api/v1/'

export default class clientService {

    getToken() {
        return localStorage.getItem('token');
    }

    getClientProfil() {
        return jwtDecode(this.getToken());
    }

    CreateClient(body) {
        return fetch(
            url + 'Client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-access-token': this.getToken()
            },
            body: JSON.stringify(body)
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    ReadClient() {
        return fetch(
            url + 'client', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-access-token': this.getToken()
            }
        }).then(res => {
            console.log(res);
            return res.json();
        })
    }

    GetClientDetail(id) {
        return fetch(url + `client/${id}`, {
                method: 'GET', 
                headers: {'x-access-token': this.getToken()}
            })
            .then(res => {
                return res.json();
            })
    }

    UpdateClient(id, body) {
        return fetch(url + `client/${id}`, {
            method: "PATCH",
            headers: { "x-access-token": this.getToken(),"Content-Type":"application/json" },
            body: JSON.stringify(body),
          }).then(function(res) {
            console.log(res);
            return res.json();
          });
    }

    UpdatePasswordClient(id, body) {
        return fetch(url + `clientPassword/${id}`, {
            method: "PATCH",
            headers: { "x-access-token": this.getToken(),"Content-Type":"application/json" },
            body: JSON.stringify(body),
          }).then(function(res) {
            console.log(res);
            return res.json();
          });
    }

    DeleteClient(id) {
        return fetch(url + `client/${id}`, {
            method: "DELETE",
            headers: { "x-access-token": this.getToken() }
          }).then(function(res) {
            return res.json();
          });
    }
}