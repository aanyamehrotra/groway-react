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
    {
      question: "How comfortable are you with learning new programming languages?",
      options: ["Very Uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very Comfortable"]
    },
    {
      question: "How do you handle debugging complex issues?",
      options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
    },
    {
      question: "How important is code quality to you?",
      options: ["Not Important", "Slightly Important", "Moderately Important", "Important", "Very Important"]
    },
    {
      question: "How do you handle tight deadlines?",
      options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
    },
    {
      question: "How often do you learn new technologies?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      question: "How well do you work in a team?",
      options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
    },
    {
      question: "How do you feel about code reviews?",
      options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"]
    },
    {
      question: "How do you handle project requirements changes?",
      options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
    },
    {
      question: "How important is documentation to you?",
      options: ["Not Important", "Slightly Important", "Moderately Important", "Important", "Very Important"]
    }
  ]
};

// Generate dummy questions for all categories
categories.forEach(category => {
  if (!questions[category]) {
    questions[category] = [
      {
        question: `How do you handle stress in ${category} role?`,
        options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
      },
      {
        question: `What motivates you to work as a ${category}?`,
        options: ["Not Motivated", "Slightly Motivated", "Moderately Motivated", "Motivated", "Highly Motivated"]
      },
      {
        question: `How do you stay updated with ${category} industry trends?`,
        options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
      },
      {
        question: `How do you handle difficult clients in ${category} field?`,
        options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
      },
      {
        question: `What's your approach to problem-solving as a ${category}?`,
        options: ["Very Poor", "Poor", "Average", "Good", "Excellent"]
      },
      {
        question: `How do you manage time in ${category} role?`,
        options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
      },
      {
        question: `How well do you collaborate with team members?`,
        options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
      },
      {
        question: `How confident are you in your ${category} skills?`,
        options: ["Not Confident", "Slightly Confident", "Moderately Confident", "Confident", "Very Confident"]
      },
      {
        question: `How do you handle feedback in your work?`,
        options: ["Very Poorly", "Poorly", "Average", "Well", "Very Well"]
      }
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
  };

  const handleNext = () => {
    if (currentQuestion < questions[selectedCategory].length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
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
            <p className="question">{questions[selectedCategory][currentQuestion].question}</p>
            
            <div className="radio-group">
              {questions[selectedCategory][currentQuestion].options.map((option, index) => (
                <label key={index} className="radio-label">
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={() => handleAnswer(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <div className="navigation-buttons">
              <button 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="nav-btn"
              >
                Previous
              </button>
              <button 
                onClick={handleNext}
                disabled={currentQuestion === questions[selectedCategory].length - 1}
                className="nav-btn"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestSection;