/**
 *
 *
 *
 *
 */

// -------------------------------------------------------------

// /api/auth/me
export const me = (req, res, next) => res.status(200).json(req.user);
