import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from './middleware.mjs';
// import routes from './routes.mjs';
import router from './routes/taskRoutes.mjs'
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("Connected to Database"))
    .catch((err)=> console.log(`Error: ${err}`));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use the logger middleware to log requests
app.use(logger);

// app.use(routes);
app.use(router);

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the directory where your EJS templates are located
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

