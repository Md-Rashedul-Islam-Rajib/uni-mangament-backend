import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { changePasswordValidationSchema, loginValidationSchema, refreshTokenValidationSchema } from "./auth.zodSchema";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";

const AuthRouter: Router = Router();

AuthRouter.post('/login', validateRequest(loginValidationSchema), AuthControllers.loginUser);

AuthRouter.post('/login', validateRequest(refreshTokenValidationSchema), AuthControllers.refreshToken);

AuthRouter.post('/change-password', auth(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
    
),validateRequest(changePasswordValidationSchema),AuthControllers.changePassword);

export default AuthRouter;