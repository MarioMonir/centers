import { Router } from "express";
import googleOAuthRouter from "../GoogleOAuth/google.router.auth";
import { isAuthenticated } from "../Middleware/isAuthenticated.auth";
import { me } from "../OAuth/oauth.controller";

// ------------------------------------------------------

const authRouter = Router();

// ------------------------------------------------------

// Google OAuth
authRouter.use("/google", googleOAuthRouter);

// OAuth
authRouter.use("/me", isAuthenticated, me);

// ------------------------------------------------------

export default authRouter;
