import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const AdminRouter: Router = Router();

AdminRouter.get('/' , AdminControllers.getAllAdmins);

AdminRouter.get('/:id' , AdminControllers.getSingleAdmin);



export default AdminRouter;