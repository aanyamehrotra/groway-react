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
  const [currentSection, setCurrentSection] = React.useState('home');

  const handleStartTest = () => {
    setShowTest(true);
    setShowLogin(false);
    setCurrentSection('test');
  };

  const handleNavigation = (section) => {
    setCurrentSection(section);
    if (section === 'home') {
      setShowLogin(false);
      setShowTest(false);
    } else if (section === 'test') {
      setShowTest(true);
      setShowLogin(false);
    }
  };

  const renderMainContent = () => {
    if (showLogin) {
      return <LoginSignup onStartTest={handleStartTest} />;
    }
    
    if (showTest) {
      return <TestSection />;
    }

    return (
      <main>
        <ChangeYourself />
        <Landing />
        {currentSection === 'pricing' && <div id="pricing-section"><Pricing /></div>}
        {currentSection === 'contact' && <div id="contact-section"><Landing /></div>}
      </main>
    );
  };

  return (
    <div className="app-container">
      <Navbar 
        onLoginClick={() => {
          setShowLogin(true);
          setShowTest(false);
        }} 
        onNavigation={handleNavigation}
        currentSection={currentSection}
      />
      {renderMainContent()}
    </div>
  );
}

export default App;