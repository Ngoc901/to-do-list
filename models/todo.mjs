import mongoose, { mongo } from "mongoose";

const TaskSchema = new mongoose.Schema({
      task_name: {
    type: String,
    required: true,
  },
  task_description: {
    type: String,
    required: false,
  },
  due_date: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
  }

});

export const Task = mongoose.model('Task', TaskSchema);

export default Task; // ✅ ES Module export
