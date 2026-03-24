// Authentication Controller - MongoDB Version
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Login handler
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return errorResponse(res, 400, 'Email and password are required');
    }

    // Find user with password field (normally excluded)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    // Check password (plain text comparison - in production use bcrypt)
    if (user.password !== password) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    // Check if user is active
    if (user.status !== 'active') {
      return errorResponse(res, 401, 'Account is inactive. Please contact admin.');
    }

    // Create user response (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: 'dummy-jwt-token-' + Date.now()
    };

    return successResponse(res, 200, 'Login successful', userData);
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, 500, 'Server error during login');
  }
};
