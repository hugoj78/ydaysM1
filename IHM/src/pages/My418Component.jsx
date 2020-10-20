import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap'

export class My418Component extends Component {

    constructor() {
        super();

        this.state = {
            title : "418. I'm a teapot",
            description: "Le statut erreur client HTTP 418 I'm a teapot qui signifie 'Je suis une théière' informe que le serveur refuse de préparer du café, car il s'agit d'une théière. Cette erreur est une référence au protocole Hyper Text Coffee Pot Control Protocol qui est le poisson d'avril des RFCs en 1998.",
            msgLove: "Bisous Matthias <3"
            }
    }

    render() {
    return (
        <Container>
            <Row>
                <Col>
                    <br/>
                    <img
                    alt="teapot"
                    src="/img/logoo.png"
                    width="300"
                    height="150"
                    className="d-inline-block align-top"/>
                    <br/>
                    <br/>
                    <h1>{this.state.title}</h1>
                    <br/>
                    <br/>
                    <p>{this.state.description}</p>
                </Col>

                <Col>
                    <img
                    alt="teapot"
                    src="/img/teapot.png"
                    width="512"
                    height="400"
                    className="d-inline-block align-top"/>
                </Col>
                
                <Col sm={12}>
                    <br/><br/><br/>
                    <p>{this.state.msgLove}</p>
                </Col>
            
           
            </Row>
        </Container>
    );
  }
}

export default My418Component;