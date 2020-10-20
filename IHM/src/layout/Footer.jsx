import React, { Component } from 'react'
// import { Badge, Col, Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import "./css/Footer.css";

export default class Footer extends Component {

    render() {
        return (
                <footer className="footer" style={{backgroundColor: `#a1d9e5` }}>
                    <img src="/img/footer.png" alt="footer img" width="100%" height="auto" style={{backgroundColor:'#83caa3'}}></img>
                    
                    <p className="ez" style={{backgroundColor: `#a1d9e5` }}>Copyright © - 2020-2021</p>
                </footer>
        )
    }
}
