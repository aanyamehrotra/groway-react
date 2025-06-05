import React, { useState } from 'react';
import './TestSection.css';

const categories = [
  "Accountant", "Analyst", "Architect", "Artist", "Auditor", "Blogger", "Business Analyst", "Businessman",
  "Chef", "CEO", "Coach", "Cosmetologist", "Data Analyst", "Designer", "DevOps Engineer", "Director",
  "Doctor", "Driver", "Ecologist", "Economist", "Engineer", "Entrepreneur", "Freelancer", "HR Specialist",
  "Investor", "Journalist", "Lawyer", "Logistics Manager", "Marketer", "Mentor", "Music Theory Teacher",
  "Osteopath", "Pharmacist", "Photographer", "Product Manager", "Project Manager", "Psychologist",
  "Psychotherapist", "Real Estate Specialist", "Sales Manager", "Software Engineer", "Trader",
  "UX/UI Designer", "Web Developer", "Writer"
].sort();

const questions = {
  "Software Engineer": [
    "How comfortable are you with learning new programming languages and frameworks?",
    "How do you approach debugging complex technical issues?",
    "How important is code quality and maintainability to you?",
    "How do you handle tight deadlines and changing requirements?",
    "How do you stay updated with the latest technology trends?",
    "How do you collaborate with non-technical team members?",
    "How do you approach system architecture decisions?",
    "How do you handle technical debt in your projects?",
    "How do you ensure the security of your applications?"
  ],
  // Add more categories with their questions here
};

// Generate dummy questions for all categories
categories.forEach(category => {
  if (!questions[category]) {
    questions[category] = [
      `How do you handle stress in ${category} role?`,
      `What motivates you to work as a ${category}?`,
      `How do you stay updated with ${category} industry trends?`,
      `How do you handle difficult clients/stakeholders in ${category} field?`,
      `What's your approach to problem-solving as a ${category}?`,
      `How do you manage time and priorities in ${category} role?`,
      `How do you collaborate with team members as a ${category}?`,
      `What's your biggest achievement as a ${category}?`,
      `Where do you see yourself in 5 years in ${category} field?`
    ];
  }
});

const TestSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    if (currentQuestion < questions[selectedCategory].length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  return (
    <section className="test-section">
      <div className="test-container">
        <h2>Career Assessment Test</h2>
        
        <div className="category-selector">
          <label htmlFor="category">Select your desired career:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Choose a career</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="question-container">
            <div className="progress-bar">
              <div 
                className="progress"
                style={{ width: `${(currentQuestion + 1) / questions[selectedCategory].length * 100}%` }}
              ></div>
            </div>
            
            <h3>Question {currentQuestion + 1} of {questions[selectedCategory].length}</h3>
            <p className="question">{questions[selectedCategory][currentQuestion]}</p>
            
            <div className="answers">
              {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((answer, index) => (
                <button
                  key={index}
                  className={`answer-btn ${answers[currentQuestion] === answer ? 'selected' : ''}`}
                  onClick={() => handleAnswer(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestSection;