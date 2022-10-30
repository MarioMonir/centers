/**
 * Flow Controller
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
 *     flow:
 *       type: object
 *       properties:
 *         notes:
 *           type: string
 *
 * tags:
 *   name: flow
 *
 * /flow:
 *   get:
 *    summary: Get all flows
 *    tags: [flow]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/flow'
 *
 *   post:
 *     summary: Create flow
 *     tags: [flow]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/flow'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/flow'
 *
 * /flow/{id}:
 *   get:
 *     summary: Get flow by id
 *     tags: [flow]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/flow'
 *
 *   put:
 *     summary: Edit flow
 *     tags: [flow]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/flow'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/flow'
 *
 *   delete:
 *     summary: Delete flow
 *     tags: [flow]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/flow'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/flow", prismaCrud("flow"));
