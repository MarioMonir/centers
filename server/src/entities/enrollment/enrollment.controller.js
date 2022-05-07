/**
 * Enrollment Controller
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
 *     enrollment:
 *       type: object
 *       properties:
 *         lectureCost:
 *           type: string
 *         centerCost:
 *           type: string
 *
 * tags:
 *   name: enrollment
 *
 * /enrollment:
 *   get:
 *    summary: Get all enrollments
 *    tags: [enrollment]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/enrollment'
 *
 *   post:
 *     summary: Create enrollment
 *     tags: [enrollment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/enrollment'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/enrollment'
 *
 * /enrollment/{id}:
 *   get:
 *     summary: Get enrollment by id
 *     tags: [enrollment]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/enrollment'
 *
 *   put:
 *     summary: Edit enrollment
 *     tags: [enrollment]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/enrollment'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/enrollment'
 *
 *   delete:
 *     summary: Delete enrollment
 *     tags: [enrollment]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/enrollment'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../Utils/Crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/enrollment", prismaCrud("enrollment"));
