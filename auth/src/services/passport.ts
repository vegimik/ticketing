import { Passport as passport } from "passport";
import { User } from "../models/user";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { PasswordService } from "./password";
import config from "../../config";

// Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function (err: any, user: any) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    // compare passwords - is `password` equal to user.password?
    const isMatch = PasswordService.compare(password, user.password);

    if (!isMatch) {
      return done(null, false);
    }
    return done(null, user);
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};
// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function (err: any, user: any) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

function buildAuth(passport: any) {
  passport.use(jwtLogin);
  passport.use(localLogin);
  
}

function requireAuth(passport: any) {
  return passport.authenticate("jwt", { session: false });
}

function requireSignin(passport: any) {
  return passport.authenticate("jwt", { session: false });
}

export { buildAuth, requireAuth, requireSignin };
