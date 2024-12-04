import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { departmentCreationSchema } from "./dept.zodSchema";
import { DepartmentControllers } from "./dept.controller";

const DepartmentRouter: Router = Router();

DepartmentRouter.post('/create-department', validateRequest(departmentCreationSchema),DepartmentControllers.createDepartment);