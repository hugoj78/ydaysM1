import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';


export class Login extends Component {

    constructor() {
      super();
      this.state = {
         title: 'Fnook',
         subtitle: 'Entrer votre email et mot de passe',
      }
    }
    

    render() {
    return (
        <div> 
            <br/>
            {/* <h1> {this.state.title} </h1> */}
            <img
              alt="logo"
              src="/img/logoo.png"
              width="300"
              height="150"
              className="d-inline-block align-top"/>
            <br/>
            <br/>
            <p> {this.state.subtitle} </p>
            <LoginForm/>
            <br/>
            <br/>
        </div>
    );
  }
}

export default Login;