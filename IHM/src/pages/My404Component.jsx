import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap'

export class My404Component extends Component {

    constructor() {
        super();

        this.state = {
            title : "404. Ton est île introuvable",
            description: "En informatique, l’erreur 404 est un code du protocole de communication HTTP sur le réseau Internet pour signaler un incident. Ce code est renvoyé par un serveur HTTP pour indiquer qu’aucune ressource, généralement une page web, n’a été trouvée à l’adresse demandée. L’erreur 404 est l’une des erreurs les plus reconnaissables et des plus fréquentes rencontrées sur le World Wide Web.",
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
                <br/><br/><br/>
                    <img
                    alt="teapot"
                    src="/img/404.png"
                    width="640"
                    height="340"
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

export default My404Component;