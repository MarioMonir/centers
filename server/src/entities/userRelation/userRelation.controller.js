/**
 * UserRelation Controller
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
 *     userRelation:
 *       type: object
 *       properties:
 *
 * tags:
 *   name: userRelation
 *
 * /userRelation:
 *   get:
 *    summary: Get all userRelations
 *    tags: [userRelation]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/userRelation'
 *
 *   post:
 *     summary: Create userRelation
 *     tags: [userRelation]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userRelation'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userRelation'
 *
 * /userRelation/{id}:
 *   get:
 *     summary: Get userRelation by id
 *     tags: [userRelation]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userRelation'
 *
 *   put:
 *     summary: Edit userRelation
 *     tags: [userRelation]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userRelation'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/userRelation'
 *
 *   delete:
 *     summary: Delete userRelation
 *     tags: [userRelation]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userRelation'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/userRelation", prismaCrud("userRelation"));
