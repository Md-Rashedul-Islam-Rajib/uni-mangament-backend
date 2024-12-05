import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultyCreationSchema } from "./faculty.zodSchema";
import { FacultyControllers } from "./faculty.controller";

const FacultyRouter: Router = Router();

FacultyRouter.post("/create-faculty", validateRequest(facultyCreationSchema),FacultyControllers.createFaculty);