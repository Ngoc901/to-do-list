import express from 'express';
import * as taskController from '../controllers/taskControllers.mjs';
import Task from '../models/todo.mjs';


const router = express.Router();

// View all tasks
router.get('/tasks', taskController.getAllTasks);

router.post('/tasks/add', taskController.createTask);

// Create
router.get('/add-todo', (req, res) => {
  res.render('todo-form');
});

// Cange status
router.post('/tasks/:id/done', taskController.changeStatus);

// Delete
router.post('/tasks/:id/delete', taskController.deleteTask);

// Render the To-Do list
// router.get('/todo-list', (req, res) => {
// res.render('todo-list', { tasks });
// });

// Render the To-Do Form
router.get('/add-todo', (req, res) => {
res.render('todo-form', { tasks });
});

router.get('/todo-list', async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.render('todo-list', { tasks });
});

// module.exports = router;


export default router;