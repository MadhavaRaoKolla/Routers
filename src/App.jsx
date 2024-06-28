import React from 'react';
import './Components/App.scss';
import Nav from './Components/Nav/Nav';
import Approutes from './Components/Approutes';

const App = () => {
  return (
      <div className="app">
        <Nav />
        <div className="content">
          <Approutes/>
        </div>
      </div>
  );
}

export default App;
