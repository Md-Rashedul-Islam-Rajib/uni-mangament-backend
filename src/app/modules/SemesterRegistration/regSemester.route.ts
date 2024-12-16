import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createRegSemesterValidationSchema, upadateRegSemesterValidationSchema } from "./regSemester.zodSchema";
import { RegSemesterControllers } from "./regSemester.controller";

const RegSemesterRouter: Router = Router();

RegSemesterRouter.post('/create-semester-registration', validateRequest(createRegSemesterValidationSchema),
    RegSemesterControllers.createRegSemester);

RegSemesterRouter.get('/',RegSemesterControllers.getAllRegSemester);

RegSemesterRouter.get('/:id', RegSemesterControllers.getSingleRegSemester);

RegSemesterRouter.patch('/:id',validateRequest(upadateRegSemesterValidationSchema),RegSemesterControllers.updateRegSemester);

RegSemesterRouter.delete('/:id', RegSemesterControllers.deleteRegSemester);

export default RegSemesterRouter;