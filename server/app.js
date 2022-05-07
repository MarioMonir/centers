import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import errors from "./src/Utils/Error/errorHandler.middlerware";
import swagger from "./src/Utils/SwaggerDocs/swagger.middleware";
import authRouter from "./src/Utils/Auth/Passport/passport.router.auth";
import passportAuthenticate from "./src/Utils/Auth/Passport/passport.auth";

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

// Entities contollers use
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
