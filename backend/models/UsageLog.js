const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['message_sent', 'conversation_created', 'login', 'signup']
  },
  count: {
    type: Number,
    default: 1,
    min: 1
  }
}, {
  timestamps: true
});

// Index for analytics queries
usageLogSchema.index({ userId: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model('UsageLog', usageLogSchema);