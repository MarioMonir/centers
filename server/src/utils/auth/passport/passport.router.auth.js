import { Router } from "express";
import googleOAuthRouter from "../google-oauth/google.router.auth";
import {
  loginController,
  registerController,
  meController,
} from "../oauth/oauth.controller";
import passportAuthenticate from "./passport.auth";
import passport from "passport";

// ------------------------------------------------------

const authRouter = Router();

// ------------------------------------------------------

// Google OAuth
authRouter.use("/google", googleOAuthRouter);

// OAuth
authRouter.route("/api/oauth/register").post(registerController);
authRouter.route("/api/oauth/login").post(loginController);
authRouter.use("/api/oauth/me", passportAuthenticate(passport), meController);

// ------------------------------------------------------

export default authRouter;
