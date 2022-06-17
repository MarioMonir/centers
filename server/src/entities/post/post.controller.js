/**
 * Request Controller
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
 *     request:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *
 * tags:
 *   name: post
 *
 * /request:
 *   get:
 *    summary: Get all requests
 *    tags: [request]
 *    responses:
 *      200:
 *       schema:
 *         $ref: '#/components/schemas/request'
 *
 *   post:
 *     summary: Create request
 *     tags: [request]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/request'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *
 * /request/{id}:
 *   get:
 *     summary: Get request by id
 *     tags: [request]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *
 *   put:
 *     summary: Edit request
 *     tags: [request]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *     requestBody:
 *       content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/request'
 *
 *   delete:
 *     summary: Delete request
 *     tags: [request]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       202:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/request'
 *
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/post", prismaCrud("post"));
