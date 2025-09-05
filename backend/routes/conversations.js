const express = require('express');
const { body } = require('express-validator');
const { getConversations, createConversation, deleteConversation } = require('../controllers/conversationController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const createConversationValidation = [
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ max: 10000 })
    .withMessage('Message cannot exceed 10000 characters')
];

// All routes require authentication
router.use(authenticateToken);

// Routes
router.get('/', getConversations);
router.post('/', createConversationValidation, createConversation);
router.delete('/:id', deleteConversation);

module.exports = router;