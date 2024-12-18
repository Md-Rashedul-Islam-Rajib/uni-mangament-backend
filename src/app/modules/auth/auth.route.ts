import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { loginValidationSchema } from "./auth.zodSchema";
import { AuthControllers } from "./auth.controller";

const AuthRouter: Router = Router();

AuthRouter.post('/login',validateRequest(loginValidationSchema),AuthControllers.loginUser);

export default AuthRouter;