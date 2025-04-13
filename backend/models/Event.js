const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['draft', 'published', 'live', 'completed'], default: 'draft' },
  isPublic: { type: Boolean, default: true },
  maxAttendees: { type: Number },
  coverImage: { type: String },
  tags: [{ type: String }],
  customFields: { type: Map, of: String },
  whiteLabelSettings: {
    logo: String,
    primaryColor: String,
    secondaryColor: String,
    customCSS: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', eventSchema);