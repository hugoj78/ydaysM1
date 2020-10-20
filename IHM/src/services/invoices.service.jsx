import jwtDecode from 'jwt-decode';

const url = 'http://localhost:3030/api/v1/'

export default class InvoiceService {

    getToken() {
        return localStorage.getItem('token');
    }

    getInvoiceProfil() {
        return jwtDecode(this.getToken());
    }

    CreateInvoice(body) {
        return fetch(
            url + 'invoice', {
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

    ReadInvoice() {
        return fetch(
            url + 'invoice', {
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

    ReadInvoiceOfClient(id) {
        return fetch(url + `invoiceofclient/${id}`, {
                method: 'GET', 
                headers: {'x-access-token': this.getToken()}
            })
            .then(res => {
                return res.json();
            })
    }

   

    GetInvoiceDetail(id) {
        return fetch(url + `invoice/${id}`, {
                method: 'GET', 
                headers: {'x-access-token': this.getToken()}
            })
            .then(res => {
                return res.json();
            })
    }

    UpdateInvoice(id, body) {
        return fetch(url + `invoice/${id}`, {
            method: "PATCH",
            headers: { "x-access-token": this.getToken(),"Content-Type":"application/json" },
            body: JSON.stringify(body),
          }).then(function(res) {
            //console.log(res);
            return res.json();
          });
    }

    DeleteInvoice(id) {
        return fetch(url + `invoice/${id}`, {
            method: "DELETE",
            headers: { "x-access-token": this.getToken() }
          }).then(function(res) {
            return res.json();
          });
    }
}