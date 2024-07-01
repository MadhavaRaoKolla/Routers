import React from 'react';
import './App.scss'
import Nav from './Components/Nav/Nav';
import Approutes from './Components/Approutes';
import  AuthProvider  from './Context/Auth';

const App = () => {
  return (
    <AuthProvider>
    {/* <Router> */}
      <div className="app">
        <Nav />
        <div className="content">
          <Approutes/>
        </div>
      </div>
      {/* </Router> */}
      </AuthProvider>
  );
}

export default App;
