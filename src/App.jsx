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
        <section id="home">
          <ChangeYourself />
        </section>
        <section id="features">
          <Landing />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
      </main>
    </div>
  );
}

export default App;