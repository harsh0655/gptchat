const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { getAIResponse, getChatTitle, generateContext } = require('../services/openaiService');
const { validationResult } = require('express-validator');

// Get messages for a conversation
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.query;

    if (!conversationId) {
      return res.status(400).json({
        error: 'Missing conversationId'
      });
    }

    // Verify conversation belongs to user
    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId: req.user._id
    });

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found'
      });
    }

    // Get messages
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .select('_id content messageType createdAt');

    res.json({
      messages: messages.map(msg => ({
        id: msg._id,
        content: msg.content,
        messageType: msg.messageType,
        createdAt: msg.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      error: 'Failed to fetch messages'
    });
  }
};

// Create new message and get AI response
const createMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { content, conversationId } = req.body;

    if (!content || typeof content !== 'string') {
      return res.status(400).json({
        error: 'Invalid content'
      });
    }

    let convoId = conversationId;

    // Create new conversation if none provided
    if (!conversationId) {
      const title = await getChatTitle(content);
      const newConvo = new Conversation({
        userId: req.user._id,
        title: title || 'New Chat'
      });
      await newConvo.save();
      convoId = newConvo._id;
    }

    // Create user message
    const userMessage = new Message({
      conversationId: convoId,
      userId: req.user._id,
      content,
      messageType: 'user'
    });

    await userMessage.save();

    // Get previous messages for context
    const previousMessages = await Message.find({ conversationId: convoId })
      .sort({ createdAt: 1 })
      .select('messageType content');

    // Format messages for AI
    const formattedMessages = previousMessages.map(msg => ({
      role: msg.messageType === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Generate context from previous messages
    const context = await generateContext(formattedMessages);

    // Add system message with personality and context
    formattedMessages.unshift({
      role: 'system',
      content: `You are YAPPIE, a brainrot bot who is kinda nonchalant and is based on memes and internet terms.
      You talk like someone who is chronically online. Do not use unnecessary emojis. Do not be boring. Light swearing is okay, you can creatively censor it, do not be excessive with it. Use abberivations like "fr, ong, ig, idk, idc" etc.. You can be a little mean. But also be helpful. Do not overdo it.

      Here's the context of our conversation so far:
      ${context}`
    });

    // Get AI response
    const aiResponse = await getAIResponse(formattedMessages);

    // Create AI message
    const aiMessage = new Message({
      conversationId: convoId,
      content: aiResponse || 'Sorry, I\'m having trouble thinking right now. Try again in a bit!',
      messageType: 'assistant'
    });

    await aiMessage.save();

    res.status(201).json({
      message: {
        id: userMessage._id,
        content: userMessage.content,
        messageType: userMessage.messageType,
        createdAt: userMessage.createdAt
      },
      aiMessage: {
        id: aiMessage._id,
        content: aiMessage.content,
        messageType: aiMessage.messageType,
        createdAt: aiMessage.createdAt
      },
      conversationId: convoId
    });
  } catch (error) {
    console.error('Error in message handling:', error);
    res.status(500).json({
      error: 'Failed to process message'
    });
  }
};

module.exports = {
  getMessages,
  createMessage
};