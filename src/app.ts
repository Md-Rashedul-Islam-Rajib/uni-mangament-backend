import express, { Application, Request, Response } from 'express';
import StudentRouter from './app/modules/student/student.route';
import UserRouter from './app/modules/user/user.route';


const app: Application = express();

app.use(express.json());

app.use("/students", StudentRouter);
app.use("/users", UserRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from university');
});

export default app;
