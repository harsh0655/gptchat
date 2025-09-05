const express = require('express');
const { body } = require('express-validator');
const { getMessages, createMessage } = require('../controllers/messageController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const createMessageValidation = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ max: 10000 })
    .withMessage('Message cannot exceed 10000 characters'),
  body('conversationId')
    .optional()
    .isMongoId()
    .withMessage('Invalid conversation ID')
];

// All routes require authentication
router.use(authenticateToken);

// Routes
router.get('/', getMessages);
router.post('/', createMessageValidation, createMessage);

module.exports = router;