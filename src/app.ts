import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());

// app.use("");

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from university');
});

export default app;
