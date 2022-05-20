/**
 * Attendance Controller
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
 *     attendance:
 *       type: object
 *       properties:
 *         notes:
 *           type: string
 *
 * tags:
 *   name: attendance
 *
 * /attendance:
 *   get:
 *    summary: Get all attendances
 *    tags: [attendance]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/attendance'
 *
 *   post:
 *     summary: Create attendance
 *     tags: [attendance]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/attendance'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/attendance'
 *
 * /attendance/{id}:
 *   get:
 *     summary: Get attendance by id
 *     tags: [attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/attendance'
 *
 *   put:
 *     summary: Edit attendance
 *     tags: [attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/attendance'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/attendance'
 *
 *   delete:
 *     summary: Delete attendance
 *     tags: [attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/attendance'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../Utils/Crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/attendance", prismaCrud("attendance"));
