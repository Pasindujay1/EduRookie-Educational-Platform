import mongoose from 'mongoose';

const LearnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Learner = mongoose.model('Learner', LearnerSchema);
export default Learner;
