const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    default: 'New Chat',
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  contextSummary: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for better query performance
conversationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);