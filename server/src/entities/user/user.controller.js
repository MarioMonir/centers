/**
 * User Controller
 * -------------------------------------------------------
 *
 * you can recap the architecture of entity controller and how
 * to overide the controller and the service at _example
 *   ./src/entites/_example/_example.controller.js
 *   ./src/entites/_example/_example.service.js
 *
 */

// ---------------------------------------------

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         permission:
 *           type: string
 *
 * tags:
 *   name: user
 *
 * /user:
 *   get:
 *    summary: Get all users
 *    tags: [user]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/user'
 *
 *   post:
 *     summary: Create user
 *     tags: [user]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *
 * /user/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *
 *   put:
 *     summary: Edit user
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/user'
 *
 *   delete:
 *     summary: Delete user
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../Utils/Crud/express-crud-router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["info", "query"],
});

// ------------------------------------------------------------------
const crudController = {
  ...prismaCrud("user"),

  // getList: exampleService.getList,
  // getOne: id => Promise,
  // create: body => Promise,
  // update: (id, body) => Promise,
  // destroy: id => Promise ,
};

// ------------------------------------------------------------------

export default crud("/user", crudController);
