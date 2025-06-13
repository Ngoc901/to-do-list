import Task from '../models/todo.mjs';

// Show all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ due_date: 1 });
    res.render('index', { tasks });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create new task
export const createTask = async (req, res) => {
  try {
    const { task_name, task_description, due_date } = req.body;

    if (!task_name || !due_date) {
      return res.status(400).send('Task name and due date are required.');
    }

    await Task.create({ task_name, task_description, due_date });
    res.redirect('/todo-list');
  } catch (err) {
    res.status(400).send(err.message);
  }
};


// Set task to done and delete it
export const changeStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    task.status = true;
    await task.save();
    await Task.findByIdAndDelete(req.params.id); // Delete after marking as done
    res.redirect('/todo-list');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/todo-list');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
