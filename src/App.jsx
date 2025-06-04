import React from 'react';
import Navbar from './components/Navbar';
import ChangeYourself from './components/change-yourself';  
import Landing from './components/landing';
import './App.css';
import Pricing from './components/Pricing';
function App() {


  return (
    <div>
      <Navbar />
      <ChangeYourself />
      <Landing /> 
      <Pricing />

    </div>
  );
}

export default App;

