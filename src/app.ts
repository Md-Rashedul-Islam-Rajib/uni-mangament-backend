import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import { handleErrors } from './app/utilities/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from university');
});

app.use(handleErrors);
export default app;
