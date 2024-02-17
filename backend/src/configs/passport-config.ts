import dotenv from "dotenv";
import { Request } from "express";
import passport from "passport";
import passportJWT from "passport-jwt";

import User from "../models/user.model";
// import { IUserRes } from "../types/user.type";

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const secret = process.env.JWT_SECRET;

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.signedCookies["jwt"]) {
    jwt = req.signedCookies["jwt"];
  }
  return jwt;
};

const opts = {
  secretOrKey: secret,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new JWTStrategy(opts, async (jwtPayload, done) => {
    const user = await User.findOne({ _id: jwtPayload.userId });
    const { exp } = jwtPayload;

    if (!user || Date.now() / 1000 > exp) {
      done("Unauthorized", false);
    }

    done(null, jwtPayload);
  }),
);
