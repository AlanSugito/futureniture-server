import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {errorHandler} from '../middlewares/index.js';
import {authRouter} from '../routers/index.js';

const server = express();

server.use(cors({credentials: true, origin: '*'}));
server.use(express.json());
server.use(cookieParser());
server.use(express.static('public'));

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.use('/users/auth', authRouter);

server.use(errorHandler);

export default server;
