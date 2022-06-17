import express from "express";
import passport from "passport";

// ================================================================

const googleOAuthRouter = express.Router();
const successRedirect = "http://localhost:3000/login/success";
const failureRedirect = "http://localhost:3000/login/failed";

// ================================================================

const successCallBack = (req, res) =>
  res.send({ message: "thank you for sign in " });

// ================================================================

const passportGoogleMiddleWare = passport.authenticate("google", {
  failureMessage: "Cannot login to google ",
  passReqToCallback: true,
  failureRedirect,
  successRedirect,
});

// ================================================================
// Google Router

// api/auth/google/login
googleOAuthRouter.route("/login").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// api/auth/google/callback
googleOAuthRouter.get("/callback", passportGoogleMiddleWare, successCallBack);

// ================================================================

export default googleOAuthRouter;
