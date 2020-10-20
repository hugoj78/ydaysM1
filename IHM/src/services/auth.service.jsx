import jwtDecode from 'jwt-decode';

export default class AuthService {
    login(body) {
        return fetch(
            'http://localhost:3030/api/v1/client/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            return res.json();
        })
    }

    SignUp(body) {
        return fetch(
            'http://localhost:3030/api/v1/client/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            return res.json();
        })
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getAdmin() {
        return localStorage.getItem('admin');
    }

    getUserProfil() {
        return jwtDecode(this.getToken());
    }

    getUserDetail(id) {
        return fetch(`http://localhost:3030/api/v1/client/${id}`, {
                method: 'GET', 
                headers: {'x-access-token': this.getToken()}
            })
            .then(res => {
                return res.json();
            })
    }

    disconnectUser() {
        localStorage.clear();
    }
}
