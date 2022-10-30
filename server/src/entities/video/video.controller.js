/**
 * Video Controller
 * ------------------------------------------------------------------

 *
 * you can recap the architecture of entity controller and how
 * to overide the controller and the service at _example
 *   ./src/entites/_example/_example.controller.js
 *   ./src/entites/_example/_example.service.js
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";

// ------------------------------------------------------------------

export default crud("/video", prismaCrud("video"));
