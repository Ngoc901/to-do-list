import { Router } from 'express';
import {todos} from './constants.mjs';
import { resolveIndexByTodoId } from './middleware.mjs';


const router = Router();

// List all To-Do items
router.get('/todos', (req, res) => {
    res.json(todos);
});

// Create a new To-Do item
router.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        description: req.body.description,
        done: false,
    };
    todos.push(newTodo);
    res.redirect('/todo-list');
});


// Delete a new To-Do item
router.delete('/todos/:id', resolveIndexByTodoId ,(request, response)=>{
    const{
       findTodoIndex
    } = request;
    todos.splice(findTodoIndex, 1);
    return response.sendStatus(200);
});

// Render the To-Do list
router.get('/todo-list', (req, res) => {
res.render('todo-list', { todos });
});

// Render the To-Do Form
router.get('/add-todo', (req, res) => {
res.render('todo-form', { todos });
});

// Find todo by id
router.get('/todo/:id',resolveIndexByTodoId ,(request, response)=>{
    const { findTodoIndex } = request;
    const findTodo = users[findTodoIndex];
    if(!findTodo) return response.status(404).send({msg: "Friendly error message:) This todo is nonexistent."});
    return response.send(findTodo);
});

// update todo
router.put('/todo/:id', resolveIndexByTodoId ,(request, response)=>{
    const {  body, findTodoIndex } = request;
    todos[findTodoIndex] = { id: todos[findTodoIndex].id, ...body };
    return response.status(200);
})

// Mark a todo as done
router.post('/todo/:id/done', resolveIndexByTodoId, (req, res) => {
    const { findTodoIndex } = req;
    todos.splice(findTodoIndex, 1); // Remove the todo from the array
    res.redirect('/todo-list');
});





export default router;