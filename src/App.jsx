import React from 'react';
import Navbar from './components/Navbar';
import ChangeYourself from './components/change-yourself';  
import Landing from './components/landing';
import Pricing from './components/Pricing';
import LoginSignup from './components/LoginSignup';
import TestSection from './components/TestSection';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showTest, setShowTest] = React.useState(false);

  const handleStartTest = () => {
    setShowTest(true);
    setShowLogin(false);
  };

  return (
    <div className="app-container">
      <Navbar 
        onLoginClick={() => setShowLogin(true)} 
        onHomeClick={() => {
          setShowLogin(false);
          setShowTest(false);
        }}
      />
      {showLogin ? (
        <LoginSignup onStartTest={handleStartTest} />
      ) : showTest ? (
        <TestSection />
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