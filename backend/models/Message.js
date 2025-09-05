const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: [10000, 'Message cannot exceed 10000 characters']
  },
  messageType: {
    type: String,
    required: true,
    enum: ['user', 'assistant'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Index for better query performance
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ userId: 1 });

module.exports = mongoose.model('Message', messageSchema);