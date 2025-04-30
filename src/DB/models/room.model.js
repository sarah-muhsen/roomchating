import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomname: {
    type: String,
  },
  createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
},{timestamps:true});

const Roommodel=mongoose.models.room||mongoose.model('room', roomSchema);

export default Roommodel;
