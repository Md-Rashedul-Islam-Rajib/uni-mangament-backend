import { Router } from "express";
import { AdminControllers } from "./admin.controller";

const AdminRouter: Router = Router();

AdminRouter.get('/' , AdminControllers.getAllAdmins);




export default AdminRouter;