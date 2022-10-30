/*
 * Google OAuth Strategy by Passport.js
 *
 **/

// ---------------------------------------------------------

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateGoogleUser } from "../auth-crud/auth.curd.prisma";

// ---------------------------------------------------------

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  consumerKey: process.env.GOOGLE_CLIENT_ID,
  consumerSecret: process.env.GOOGLE_CLIENT_SECRET,
  passReqToCallback: true,
};

// ---------------------------------------------------------

const verifyCallBack = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { id, name, emails, photos } = profile;

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    const payload = {
      name: name?.displayName,
      email: emails[0]?.value,
      picture: photos[0]?.value,
      googleId: id,
    };

    // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

    // find or create
    let user = await findOrCreateGoogleUser(payload);
    if (!user) return done(null, false);
    const reponseUser = { ...user, accessToken, refreshToken };
    return done(null, reponseUser);
  } catch (err) {
    console.error({ err });
    return done(err, false);
  }
};

// ---------------------------------------------------------

export default new GoogleStrategy(options, verifyCallBack);
