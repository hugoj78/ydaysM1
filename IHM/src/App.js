import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{backgroundColor: `#83caa3` }}>
      <BrowserRouter>
        <Header/>
          <Routes/>
        <Footer style={{backgroundColor: `#a1d9e5` }}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
