import moongose from 'mongoose';

const userSchema = new moongose.Schema({
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export default moongose.model('users', userSchema);
