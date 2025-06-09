import { AppError } from '../utils/AppError.js';

export const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return next(new AppError('Access denied. Admin privileges required.', 403));
  }
};