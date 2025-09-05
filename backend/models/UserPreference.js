const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  theme: {
    type: String,
    default: 'default',
    enum: ['default', 'dark', 'light']
  },
  notificationsEnabled: {
    type: Boolean,
    default: true
  },
  otherPrefs: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserPreference', userPreferenceSchema);