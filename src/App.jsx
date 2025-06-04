import React from 'react';
import Navbar from './components/Navbar';
import ChangeYourself from './components/change-yourself';  
import Landing from './components/landing';
import Pricing from './components/Pricing';
import LoginSignup from './components/LoginSignup';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <div className="app-container">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      {showLogin ? (
        <LoginSignup />
      ) : (
        <main>
          <ChangeYourself />
          <Landing />
          <Pricing />
        </main>
      )}
    </div>
  );
}

export default App;