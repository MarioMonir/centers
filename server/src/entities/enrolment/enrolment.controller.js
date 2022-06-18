/**
 * Enrolment Controller
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
 *     enrolment:
 *       type: object
 *       properties:
 *         lectureCost:
 *           type: string
 *         centerCost:
 *           type: string
 *
 * tags:
 *   name: enrolment
 *
 * /enrolment:
 *   get:
 *    summary: Get all enrolments
 *    tags: [enrolment]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/enrolment'
 *
 *   post:
 *     summary: Create enrolment
 *     tags: [enrolment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/enrolment'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/enrolment'
 *
 * /enrolment/{id}:
 *   get:
 *     summary: Get enrolment by id
 *     tags: [enrolment]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/enrolment'
 *
 *   put:
 *     summary: Edit enrolment
 *     tags: [enrolment]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/enrolment'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/enrolment'
 *
 *   delete:
 *     summary: Delete enrolment
 *     tags: [enrolment]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/enrolment'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/enrolment", prismaCrud("enrolment"));
