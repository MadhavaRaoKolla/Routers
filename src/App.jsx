import React from 'react';
import './Components/App.scss';
import Nav from './Components/Nav/Nav';
import Home from './Components/Pages/Home/Home';
import Signin from './Components/Pages/Signin/Signin';
import Signup from './Components/Pages/Signup/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <div className="content">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
