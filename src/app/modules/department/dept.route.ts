import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { departmentCreationSchema } from "./dept.zodSchema";
import { DepartmentControllers } from "./dept.controller";
import { DepartmentServices } from "./dept.service";

const DepartmentRouter: Router = Router();

DepartmentRouter.post('/create-department', validateRequest(departmentCreationSchema), DepartmentControllers.createDepartment);

DepartmentRouter.get('/',DepartmentControllers.getAllDepartment);

DepartmentRouter.get("/:id", DepartmentServices.getSingleDepartment);

export default DepartmentRouter;