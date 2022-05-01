import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import errors from "./src/utils/error/errorHandler.middlerware";
import swagger from "./src/utils/swaggerDocs/swagger.middleware";
import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import jwt from "jsonwebtoken";

// ------------------------------------------------------

// Entities controllers imports
import userController from "./src/entities/user/user.controller.js";
import userRelationController from "./src/entities/userRelation/userRelation.controller.js";
import groupController from "./src/entities/group/group.controller.js";
import flowController from "./src/entities/flow/flow.controller.js";
import attendanceController from "./src/entities/attendance/attendance.controller.js";
import enrollmentController from "./src/entities/enrollment/enrollment.controller.js";
import requestController from "./src/entities/request/request.controller.js";
import postController from "./src/entities/post/post.controller.js";
import _exampleController from "./src/entities/_example/_example.controller.js";

// ------------------------------------------------------

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query", "error", "info"],
});

export const applyPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = "Add_Your_Own_Secret_Key";
  passport.use(
    new Strategy(options, async ({ id }, done) => {
      try {
        console.log("i am here");
        let user = await prisma.user.findUnique({ where: { id } });
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    })
  );
};

applyPassportStrategy(passport);

// ------------------------------------------------------

const app = express();

// ------------------------------------------------------

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ------------------------------------------------------
// app.post("/login", async (req, res, next) => {
//   const { email, password } = req.body;
//   console.log("b", req.body);
//   // TODO: get user by email and password and generate acces token

//   let user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(401).json({ message: "invalid user" });

//   console.log(user);

//   const secret = "Add_Your_Own_Secret_Key";
//   const token = jwt.sign({ id: user?.id }, secret, {
//     expiresIn: 24 * 60 * 60 * 1000,
//   });

//   res.status(200).json({ token });
// });

// // Entities contollers use
// // app.use("*", passport.authenticate("jwt", { session: false }));

// app.use(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     console.log("Asd");
//     console.log("asdasdasd ", req?.user);
//     next();
//   }
// );

// app.use("*", (req, res, next) => {
//   console.log("headers ", req.headers);
//   console.log("req.user is Auth", req.isAuthenticated());
//   console.log("req.user is Auth", req.user);
//   next();
// });

app.use(userController);
app.use(userRelationController);
app.use(groupController);
app.use(flowController);
app.use(attendanceController);
app.use(enrollmentController);
app.use(requestController);
app.use(postController);
app.use(_exampleController);

// Swagger Documentaion Middleware
app.use("/api-docs", swagger.server, swagger.setup); // Docs

// ------------------------------------------------------

// Error Handlers
app.use(errors.catchNotFound);
app.use(errors.errorHandler);

//---------------------------------------------------

export default app;
