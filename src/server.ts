import express from 'express';
import routes from './routes/index';
import './database/connection';
import path from 'path';
import errorHandle from './errors/handle';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')))
app.use(errorHandle);

app.listen(3333);