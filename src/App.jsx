import React from 'react';
import Navbar from './components/Navbar';
import ChangeYourself from './components/change-yourself';  
import Landing from './components/landing';
import Pricing from './components/Pricing';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <ChangeYourself />
        <Landing />
        <Pricing />
      </main>
    </div>
  );
}

export default App;