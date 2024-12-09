import { updateFacultyMemberValidationSchema } from './member.zodSchema';
import { Router } from "express";
import { FacultyControllers } from "../faculty/faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyMemberControllers } from './member.controller';

const FacultyMemberRouter: Router = Router();


FacultyMemberRouter.get('/', FacultyControllers.getAllFaculties);

FacultyMemberRouter.get('/:id', FacultyControllers.getSingleFaculty);

FacultyMemberRouter.patch('/:id', validateRequest(updateFacultyMemberValidationSchema), FacultyMemberControllers.updateFacultyMember);

FacultyMemberRouter.delete('/:id', FacultyMemberControllers.deleteFacultyMember );

export default FacultyMemberRouter;