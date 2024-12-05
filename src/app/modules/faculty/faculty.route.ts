import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultyCreationSchema, updateFacultySchema } from "./faculty.zodSchema";
import { FacultyControllers } from "./faculty.controller";

const FacultyRouter: Router = Router();

FacultyRouter.post("/create-faculty", validateRequest(facultyCreationSchema), FacultyControllers.createFaculty);

FacultyRouter.get("/", FacultyControllers.getAllFaculties);

FacultyRouter.get("/:id", FacultyControllers.getSingleFaculty);

FacultyRouter.patch("/:id", validateRequest(updateFacultySchema), FacultyControllers.updateFaculty);

export default FacultyRouter;