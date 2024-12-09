import { Router } from "express";
import { FacultyControllers } from "../faculty/faculty.controller";

const FacultyMemberRouter: Router = Router();


FacultyMemberRouter.get('/', FacultyControllers.getAllFaculties);

FacultyMemberRouter.get('/:id', FacultyControllers.getSingleFaculty);


export default FacultyMemberRouter;