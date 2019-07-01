import React from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import Main from './components/Main'
import Navbar from './components/Navbar'
import 'materialize-css/dist/css/materialize.min.css';
const App = () => (
    <div className="App">
      <Navbar />
      <div className="container">
        <Main />
      </div>
      <div className="fixed-action-btn">
        <Link to="/users/add" className="btn-floating btn-large red">
          <i className="fa fa-plus"></i>
        </Link>
      </div>
    </div>
  );

export default App;
