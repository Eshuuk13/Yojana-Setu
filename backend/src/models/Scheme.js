import mongoose from 'mongoose'

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      default: 'Any',
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    incomeLimit: {
      type: Number,
      default: null,
    },
    applyLink: {
      type: String,
      required: true,
      trim: true,
    },
    deadline: {
      type: String,
      required: true,
      trim: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const Scheme = mongoose.model('Scheme', schemeSchema)

export default Scheme
