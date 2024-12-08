import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import { handleErrors } from './app/utilities/globalErrorHandler';

const app: Application = express();

app.use(express.json());

app.use('/', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from university');
});

app.use(handleErrors);
export default app;
