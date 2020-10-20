import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';


export class SignUp extends Component {

    constructor() {
        super();
        this.state = {
           title: 'Fnook',
           subtitle: 'Entrer vos informations',
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
            <SignUpForm/>
            <br/>
            <br/>
        </div>
    );
  }
}

export default SignUp;