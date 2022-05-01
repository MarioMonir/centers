import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import errors from "./src/Utils/Error/errorHandler.middlerware";
import swagger from "./src/Utils/SwaggerDocs/swagger.middleware";
import passport from "passport";
import authRouter from "./src/Utils/Auth/Passport/passport.router.auth";
import passportAuthenticate from "./src/Utils/Auth/Passport/passport.auth";

// ------------------------------------------------------

// Entities controllers imports
import userController from "./src/Entities/User/user.controller.js";
import userRelationController from "./src/Entities/UserRelation/userRelation.controller.js";
import groupController from "./src/Entities/Group/group.controller.js";
import flowController from "./src/Entities/Flow/flow.controller.js";
import attendanceController from "./src/Entities/Attendance/attendance.controller.js";
import enrollmentController from "./src/Entities/Enrollment/enrollment.controller.js";
import requestController from "./src/Entities/Request/request.controller.js";
import postController from "./src/Entities/Post/post.controller.js";
import _exampleController from "./src/Entities/_Example/_example.controller.js";

// ------------------------------------------------------

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient({
//   log: ["query", "error", "info"],
// });

// export const applyPassportStrategy = (passport) => {
//   const options = {};
//   options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//   options.secretOrKey = "Add_Your_Own_Secret_Key";
//   passport.use(
//     new Strategy(options, async ({ id }, done) => {
//       try {
//         let user = await prisma.user.findUnique({ where: { id } });
//         if (!user) return done(null, false);
//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     })
//   );
// };

// applyPassportStrategy(passport);

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
//   // TODO: get user by email and password and generate acces token

//   let user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(401).json({ message: "invalid user" });


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
//     next();
//   }
// );

// app.use("*", (req, res, next) => {
//   next();
// });

// ------------------------------------------------------
// Swagger Documentaion Middleware
app.use("/api-docs", swagger.server, swagger.setup); // Docs

// Auth Router ( login / register )
app.use(authRouter);

// Auth Passport Protect Middleware
app.use(passportAuthenticate(passport));

// ------------------------------------------------------

// Entities Controllers
app.use(userController);
app.use(userRelationController);
app.use(groupController);
app.use(flowController);
app.use(attendanceController);
app.use(enrollmentController);
app.use(requestController);
app.use(postController);
app.use(_exampleController);

// ------------------------------------------------------

// Swagger Documentaion Middleware
app.use("/api-docs", swagger.server, swagger.setup); // Docs

// ------------------------------------------------------

// Error Handlers
app.use(errors.catchNotFound);
app.use(errors.errorHandler);

//---------------------------------------------------

export default app;
