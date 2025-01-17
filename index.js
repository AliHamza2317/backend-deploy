import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.get('/hello', (req, res) => {
    res.send({ message: 'Hello from /hello route' });
});

export default app;
