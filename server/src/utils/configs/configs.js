/**
 *  Configs
 * ----------------
 * 1 - cookies used for auth
 * 2 - cors
 *
 * @author justMario
 *
 */

// ---------------------------------------------------

/** Cookie configs
 * -------------------
 * secure: a boolean indicating
 * whether the cookie is only
 * to be sent over HTTPS
 *
 * max age in milliseconds = 24 * 60 * 60 * 1000 = 1day
 *
 * false by default for HTTP,
 * true by default for HTTPS
 * {@link https://github.com/expressjs/cookie-session}
 *
 */

export const cookiesConfigs = {
  maxAge: 60 * 1000,
  keys: [process.env.COOKIE_KEY],
  // secure: true,
};

// ---------------------------------------------------

/**
 *  Cors Configs
 *  ------------------
 * {@link https://github.com/expressjs/cors}
 */
export const corsConfigs = {
	origin: process.env.CORS_ORIGIN || "http://167.99.145.37:4173/" ,
  credentials: true,
};

// ---------------------------------------------------
