import React from 'react';
import Navbar from './components/Navbar';
import ChangeYourself from './components/change-yourself';  
import Landing from './components/landing'; // Capital L here
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <ChangeYourself />
      <Landing /> 
    </div>
  );
}

export default App;

