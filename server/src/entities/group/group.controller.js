/**
 * Group Controller
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
 *     group:
 *       type: object
 *       properties:
 *
 * tags:
 *   name: group
 *
 * /group:
 *   get:
 *    summary: Get all groups
 *    tags: [group]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/group'
 *
 *   post:
 *     summary: Create group
 *     tags: [group]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/group'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/group'
 *
 * /group/{id}:
 *   get:
 *     summary: Get group by id
 *     tags: [group]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/group'
 *
 *   put:
 *     summary: Edit group
 *     tags: [group]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/group'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/group'
 *
 *   delete:
 *     summary: Delete group
 *     tags: [group]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/group'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/group", prismaCrud("group"));
