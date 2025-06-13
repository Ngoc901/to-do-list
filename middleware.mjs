import fs from 'fs';
import {todos} from './constants.mjs';


export const logger = (req, res, next) => {
    const logMessage = `${new Date().toISOString()} -
    ${req.method} ${req.url}\n`;
    // Append the log message to a log file
    fs.appendFile('access.log', logMessage, (err) => {
    if (err) {
    console.error('Error writing to logfile:', err);}
    });
    next();
}

   const resolveIndexByTodoId = (request, response, next) => {
    const { params: {id} } = request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findTodoIndex = todos.findIndex((todo) => todo.id === parsedId);
    if(findTodoIndex === -1) return response.status(404);
    request.findTodoIndex = findTodoIndex;
    next();
};

export { resolveIndexByTodoId };