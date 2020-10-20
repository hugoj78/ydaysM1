import jwtDecode from 'jwt-decode';

const url = 'http://localhost:3030/api/v1/'

export default class ProductService {

    getToken() {
        return localStorage.getItem('token');
    }

    getProductProfil() {
        return jwtDecode(this.getToken());
    }

    CreateProduct(body) {
        return fetch(
            url + 'product', {
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
            url + 'product', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-access-token': this.getToken()
            }
        }).then(res => {
            //console.log(res);
            return res.json();
        })
    }

    GetProductDetail(id) {
        return fetch(url + `product/${id}`, {
                method: 'GET', 
                headers: {'x-access-token': this.getToken()}
            })
            .then(res => {
                return res.json();
            })
    }

    GetProductDetailOfSeller(id) {
        return fetch(url + `productofseller/${id}`, {
                method: 'GET', 
                headers: {'x-access-token': this.getToken()}
            })
            .then(res => {
                return res.json();
            })
    }

    

    GetProductByName(name){
        return fetch(url + `search/${name}`, {
                method: 'GET', 
                headers: {'x-access-token': this.getToken()}
            })
            .then(res => {
                return res.json();
            })
    }

    GetProductMotherDetail(id) {
        return fetch(url + `productOfMother/${id}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Access-Control-Allow-Origin" : "*", 
                    "Access-Control-Allow-Credentials" : true 
                }
            })
            .then(res => {
                return res.json();
            })
    }

    UpdateProduct(id, body) {
        return fetch(url + `product/${id}`, {
            method: "PATCH",
            headers: { "x-access-token": this.getToken(),"Content-Type":"application/json" },
            body: JSON.stringify(body),
          }).then(function(res) {
            //console.log(res);
            return res.json();
          });
    }

    DeleteProduct(id) {
        return fetch(url + `product/${id}`, {
            method: "DELETE",
            headers: { "x-access-token": this.getToken() }
          }).then(function(res) {
            return res.json();
          });
    }
}