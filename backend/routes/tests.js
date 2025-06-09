import express from 'express';
import { body } from 'express-validator';
import {
  getTestCategories,
  getTestQuestions,
  submitTestResult,
  getUserTestResults,
  getTestResult,
  deleteTestResult
} from '../controllers/testController.js';
import { auth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Validation rules
const submitTestValidation = [
  body('category').notEmpty().withMessage('Test category is required'),
  body('answers').isArray({ min: 1 }).withMessage('Answers array is required'),
  body('answers.*.question').notEmpty().withMessage('Question is required'),
  body('answers.*.answer').notEmpty().withMessage('Answer is required'),
  body('timeSpent').optional().isNumeric().withMessage('Time spent must be a number')
];

// Routes
router.get('/categories', getTestCategories);
router.get('/questions/:category', getTestQuestions);
router.post('/submit', auth, submitTestValidation, validate, submitTestResult);
router.get('/results', auth, getUserTestResults);
router.get('/results/:id', auth, getTestResult);
router.delete('/results/:id', auth, deleteTestResult);

export default router;