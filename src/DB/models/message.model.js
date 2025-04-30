import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'room',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const messagemodel = mongoose.models.message||mongoose.model('message', messageSchema);

export default messagemodel;
