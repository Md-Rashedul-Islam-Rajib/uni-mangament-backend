import express, { Application, Request, Response } from 'express';
import router from './app/routes';


const app: Application = express();

app.use(express.json());

app.use("/", router);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello from university');
});

export default app;
