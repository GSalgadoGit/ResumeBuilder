const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const abilitySchema = new Schema(
{
  description: { type: String }
}, 
{
  timestamps: true
});

const skillSchema = new Schema (
{
  name: {
    type: String,
    required: true,
    unique: true
  },
  abilities: [abilitySchema]
}, 
{
  timestamps: true
});

const Skill = mongoose.model('skill', skillSchema);

module.exports = Skill;