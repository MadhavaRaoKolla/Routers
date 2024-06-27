import React from 'react';
import './Components/App.scss';
import Nav from './Components/Nav/Nav';
import Home from './Components/Pages/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Pages/Register/Register';
import Login from './Components/Pages/Login/Login';
import Error from './Components/Pages/Error/Error';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <div className="content">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register/>} />
            <Route path='*' element={<Error/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
