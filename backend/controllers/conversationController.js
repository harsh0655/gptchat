const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { validationResult } = require('express-validator');

// Get all conversations for a user
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('_id title createdAt');

    res.json(conversations.map(conv => ({
      id: conv._id,
      title: conv.title,
      createdAt: conv.createdAt
    })));
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      error: 'Failed to fetch conversations'
    });
  }
};

// Create new conversation
const createConversation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({
        error: 'Message content is required'
      });
    }

    // Create conversation
    const conversation = new Conversation({
      userId: req.user._id
    });

    await conversation.save();

    // Create initial message
    const message = new Message({
      conversationId: conversation._id,
      userId: req.user._id,
      content: content.trim(),
      messageType: 'user'
    });

    await message.save();

    res.status(201).json({
      id: conversation._id
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({
      error: 'Failed to create conversation'
    });
  }
};

// Delete conversation
const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;

    // Find conversation and verify ownership
    const conversation = await Conversation.findOne({
      _id: id,
      userId: req.user._id
    });

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found'
      });
    }

    // Delete all messages in the conversation
    await Message.deleteMany({ conversationId: id });

    // Delete the conversation
    await Conversation.findByIdAndDelete(id);

    res.json({
      message: 'Conversation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({
      error: 'Failed to delete conversation'
    });
  }
};

module.exports = {
  getConversations,
  createConversation,
  deleteConversation
};