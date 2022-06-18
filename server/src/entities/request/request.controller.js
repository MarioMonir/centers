/**
 * Entity Controller
 * -------------------------------------------------------
 *
 * Entity controller have to be thin and the custom
 * business logic have to be in service layer ( _example.service.js )
 *
 * you can simply overide this controller for crud controller
 * or custom routes controller as following :
 * ------------------------------------------
 *
 * - Crud Controller  :
 * -------------------------
 *  => getList , getOne , create , update , destroy
 *
 *  Note : promise have to be set in service (_example.service.js)
 *
 *  const crudController = {
 *    ...prismaCrud("entitiy") ,
 *    getList: ({ filter, limit, offset, order }) => Promise ,
 *    getOne: id => Promise,
 *    create: body => Promise,
 *    update: (id, body) => Promise,
 *    destroy: id => Promise ,
 *  }
 *
 * -------------------------------------------------------
 *
 * - Custom Routes Controller
 * -----------------------------
 *
 * const customRoutesController = [
 *   {
 *     method: "get",   // http request ( get, post, put, delete, patch , ... )
 *     path: "/mario",  // independent of eniity path
 *     controller: (req, res, next) => {
 *     let customRes = exampleService.mario();
 *     res.status(202).json({ message: customRes });
 *   },
 *  },
 * ];
 *
 * // ---------------------------------------------
 *
 * export default crud("/example", crudController, customRoutesController);
 *
 */

// ------------------------------------------------------------------

import { crud, prismaCrud } from "../../utils/crud/express-crud-router";
import requestService from "./request.service";

// ------------------------------------------------------------------

/**
 *  NOTE :
 *    for sure for this example the prisma curds will not work because
 *    no model in database called exmaple
 */

// ------------------------------------------------------------------

const crudController = {
  ...prismaCrud("request"),

  update: (id, body) => requestService.update(id, body),
};

// ------------------------------------------------------------------

export default crud("/request", crudController);
