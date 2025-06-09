import TestResult from '../models/TestResult.js';
import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

// Test categories and questions data
const categories = [
  "Accountant", "Analyst", "Architect", "Artist", "Auditor", "Blogger", "Business Analyst", "Businessman",
  "Chef", "CEO", "Coach", "Cosmetologist", "Data Analyst", "Designer", "DevOps Engineer", "Director",
  "Doctor", "Driver", "Ecologist", "Economist", "Engineer", "Entrepreneur", "Freelancer", "HR Specialist",
  "Investor", "Journalist", "Lawyer", "Logistics Manager", "Marketer", "Mentor", "Music Theory Teacher",
  "Osteopath", "Pharmacist", "Photographer", "Product Manager", "Project Manager", "Psychologist",
  "Psychotherapist", "Real Estate Specialist", "Sales Manager", "Software Engineer", "Trader",
  "UX/UI Designer", "Web Developer", "Writer"
].sort();

// @desc    Get all test categories
// @route   GET /api/tests/categories
// @access  Public
export const getTestCategories = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    categories
  });
});

// @desc    Get test questions for a category
// @route   GET /api/tests/questions/:category
// @access  Public
export const getTestQuestions = asyncHandler(async (req, res, next) => {
  const { category } = req.params;
  
  if (!categories.includes(category)) {
    return next(new AppError('Invalid test category', 400));
  }

  // Generate questions for the category
  const questions = [
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

  res.status(200).json({
    success: true,
    category,
    questions
  });
});

// @desc    Submit test result
// @route   POST /api/tests/submit
// @access  Private
export const submitTestResult = asyncHandler(async (req, res, next) => {
  const { category, answers, timeSpent } = req.body;
  
  if (!categories.includes(category)) {
    return next(new AppError('Invalid test category', 400));
  }

  // Calculate scores
  const scoreMap = {
    'Very Poorly': 1, 'Poorly': 2, 'Average': 3, 'Well': 4, 'Very Well': 5,
    'Not Important': 1, 'Slightly Important': 2, 'Moderately Important': 3, 'Important': 4, 'Very Important': 5,
    'Never': 1, 'Rarely': 2, 'Sometimes': 3, 'Often': 4, 'Very Often': 5,
    'Not Confident': 1, 'Slightly Confident': 2, 'Moderately Confident': 3, 'Confident': 4, 'Very Confident': 5,
    'Not Motivated': 1, 'Slightly Motivated': 2, 'Moderately Motivated': 3, 'Motivated': 4, 'Highly Motivated': 5,
    'Very Poor': 1, 'Poor': 2, 'Good': 4, 'Excellent': 5
  };

  const questionsWithScores = answers.map(answer => ({
    question: answer.question,
    answer: answer.answer,
    score: scoreMap[answer.answer] || 3
  }));

  const totalScore = questionsWithScores.reduce((sum, q) => sum + q.score, 0);
  const maxScore = questionsWithScores.length * 5;
  const percentage = Math.round((totalScore / maxScore) * 100);

  let recommendation;
  if (percentage >= 70) {
    recommendation = 'Highly Recommended';
  } else if (percentage >= 50) {
    recommendation = 'Recommended with Development';
  } else {
    recommendation = 'Consider Alternative Paths';
  }

  // Create test result
  const testResult = await TestResult.create({
    userId: req.user.id,
    category,
    questions: questionsWithScores,
    totalScore,
    maxScore,
    percentage,
    recommendation,
    timeSpent: timeSpent || 0
  });

  // Update user's test history
  await User.findByIdAndUpdate(req.user.id, {
    $push: {
      testsTaken: {
        testId: testResult._id,
        category,
        score: totalScore,
        percentage,
        completedAt: new Date()
      }
    }
  });

  res.status(201).json({
    success: true,
    testResult
  });
});

// @desc    Get user's test results
// @route   GET /api/tests/results
// @access  Private
export const getUserTestResults = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const testResults = await TestResult.find({ userId: req.user.id })
    .sort({ completedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await TestResult.countDocuments({ userId: req.user.id });

  res.status(200).json({
    success: true,
    testResults,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get specific test result
// @route   GET /api/tests/results/:id
// @access  Private
export const getTestResult = asyncHandler(async (req, res, next) => {
  const testResult = await TestResult.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!testResult) {
    return next(new AppError('Test result not found', 404));
  }

  res.status(200).json({
    success: true,
    testResult
  });
});

// @desc    Delete test result
// @route   DELETE /api/tests/results/:id
// @access  Private
export const deleteTestResult = asyncHandler(async (req, res, next) => {
  const testResult = await TestResult.findOne({
    _id: req.params.id,
    userId: req.user.id
  });

  if (!testResult) {
    return next(new AppError('Test result not found', 404));
  }

  await testResult.deleteOne();

  // Remove from user's test history
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      testsTaken: { testId: req.params.id }
    }
  });

  res.status(200).json({
    success: true,
    message: 'Test result deleted successfully'
  });
});