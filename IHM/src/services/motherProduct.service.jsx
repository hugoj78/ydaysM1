import jwtDecode from 'jwt-decode';

const url = 'http://localhost:3030/api/v1/'

export default class MotherProductService {

    getToken() {
        return localStorage.getItem('token');
    }

    getProductProfil() {
        return jwtDecode(this.getToken());
    }

    CreateProduct(body) {
        return fetch(
            url + 'motherproduct', {
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

    ReadProduct() {
        return fetch(
            url + 'motherproduct', {
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

    GetProductDetail(id) {
        return fetch(url + `motherproduct/${id}`, {
                method: 'GET', 
                headers: {'x-access-token': this.getToken()}
            })
            .then(res => {
                return res.json();
            })
    }

    UpdateProduct(id, body) {
        return fetch(url + `motherproduct/${id}`, {
            method: "PATCH",
            headers: { "x-access-token": this.getToken(),"Content-Type":"application/json" },
            body: JSON.stringify(body),
          }).then(function(res) {
            console.log(res);
            return res.json();
          });
    }


    DeleteProduct(id) {
        return fetch(url + `motherproduct/${id}`, {
            method: "DELETE",
            headers: { "x-access-token": this.getToken() }
          }).then(function(res) {
            return res.json();
          });
    }
}