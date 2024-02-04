// const createError = require("http-errors");
const express = require("express");
const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-openidconnect");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
// app.set('view engine', 'html');

// Configure Express session
app.use(
  session({
    secret: "62d60212-aa0c-46b5-ac10-a36cad51fb9c",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Okta OpenID Connect Configuration
passport.use(
  "oidc",
  new Strategy(
    {
      issuer: "https://trial-1849943.okta.com/oauth2/default",
      authorizationURL:
        "https://trial-1849943.okta.com/oauth2/default/v1/authorize",
      tokenURL: "https://trial-1849943.okta.com/oauth2/default/v1/token",
      userInfoURL: "https://trial-1849943.okta.com/oauth2/default/v1/userinfo",
      clientID: "0oaae5t3v1w2VZ9qT697",
      clientSecret:
        "3QkMhnQ5FdKAWA5t-bd7r3HfAlKD57eWDWf9ZixkovNVwSqgSrNxyMFVbbdmqSPP",
      callbackURL: "http://localhost:8080/authorization-code/callback",
      scope: "openid profile",
    },
    (issuer, sub, profile, accessToken, refreshToken, params, done) => {
      // You can customize the user profile handling here
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, next) => {
  next(null, user);
});

passport.deserializeUser((obj, next) => {
  next(null, obj);
});

// Routes
app.get("/", (req, res) => {
  res.send('<h1>Home</h1><a href="/login">Login with Okta SSO</a>');
});

app.use("/login", passport.authenticate("oidc"));

app.use(
  "/authorization-code/callback",
  passport.authenticate("oidc", { failureRedirect: "/error" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.use("/profile", (req, res) => {
    console.log("are we here : ", req.user);
  res.send(`<h1>Profile${JSON.stringify(req.user)}</h1>`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
