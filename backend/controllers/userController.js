import User from '../models/User.js';
import TestResult from '../models/TestResult.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  res.status(200).json({
    success: true,
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res, next) => {
  // Users can only access their own data unless they're admin
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to access this user', 403));
  }

  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res, next) => {
  // Users can only update their own data unless they're admin
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to update this user', 403));
  }

  const fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    preferences: req.body.preferences
  };

  // Only admin can update role and subscription
  if (req.user.role === 'admin') {
    if (req.body.role) fieldsToUpdate.role = req.body.role;
    if (req.body.subscription) fieldsToUpdate.subscription = req.body.subscription;
  }

  const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  }).select('-password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  // Users can only delete their own account unless they're admin
  if (req.user.id !== req.params.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this user', 403));
  }

  const user = await User.findById(req.params.id);
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Delete user's test results
  await TestResult.deleteMany({ userId: req.params.id });
  
  // Delete user
  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully'
  });
});

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ 
    'testsTaken.0': { $exists: true } 
  });
  
  const subscriptionStats = await User.aggregate([
    {
      $group: {
        _id: '$subscription.type',
        count: { $sum: 1 }
      }
    }
  ]);

  const testStats = await TestResult.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgScore: { $avg: '$percentage' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);

  res.status(200).json({
    success: true,
    stats: {
      totalUsers,
      activeUsers,
      subscriptionStats,
      testStats
    }
  });
});