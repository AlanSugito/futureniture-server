import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static('public'));

server.get('/', (_, res) => {
  res.send('Hello World');
});

export default server;
