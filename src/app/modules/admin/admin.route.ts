import { Router } from "express";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateAdminValidationSchema } from "./admin.zodSchema";

const AdminRouter: Router = Router();

AdminRouter.get('/' , AdminControllers.getAllAdmins);

AdminRouter.get('/:id' , AdminControllers.getSingleAdmin);

AdminRouter.patch('/:id',validateRequest(updateAdminValidationSchema),AdminControllers.updateAdmin);

export default AdminRouter;