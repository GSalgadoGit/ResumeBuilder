const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;