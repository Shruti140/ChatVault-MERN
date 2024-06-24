import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Route from './routes/route.js'; 

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors());
app.use('/',Route);

const PORT = 8000;

Connection();

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));



