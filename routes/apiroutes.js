const middleware = require("../middleware");
const passport = middleware.passport;
const User = require("../models/User");
const API = require("../controller");
const path = require("path");

const scrubUser = (userObject) => {
  let cleanUser = {};
  cleanUser.subscriptions = userObject.subscriptions;
  cleanUser.firstname = userObject.firstname;
  cleanUser.lastname = userObject.lastname;
  cleanUser.email = userObject.email;
  cleanUser.income = userObject.income;
  return cleanUser;
};

module.exports = (app) => {
  // Endpoint to login
  app.post("/login", passport.authenticate("local"), (req, res) => {
    // console.log(passport.authenticate("local"));
    console.log("req._passport in login ====================", req._passport);
    try {
      API.controller.getUser(req.user._id, (response) => {
        // console.log("/login post route res.json(scrubUser(response)", res.json(scrubUser(response)));
        console.log("response in /login", response);
        return res.json(scrubUser(response));
      });
    } catch (err) {
      throw err;
    }
  });

  app.get("/logout", (req, res) => {
    console.log("req.body in /logout", req.body);
    req.logout();
    res.send({ result: "success" });
  });

  // Register User
  app.post("/register", (req, res) => {
    console.log("req._passport in regist ====================", req._passport);

    var password = req.body.password;
    var password2 = req.body.password2;

    if (password == password2) {
      var newUser = new User({
        name: req.body.name,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        income: req.body.income,
        username: req.body.username,
        password: req.body.password,
      });

      User.createUser(newUser, (err, user) => {
        console.log("user created in post /register route", user);
        if (err) throw err;
        // added passport authentication so api/addsub post route could find user._id
        passport.authenticate("local")(req, res, function () {
          console.log("Following User has been registerd");
          console.log(user);
          res.send(user).end();
          // res.redirect("/");
        });
      });
    } else {
      res.status(500).send('{ errors: "Passwords don\'t match" }').end();
    }
  });

  // Endpoint to get current user
  app.get("/api/getuser", (req, res) => {
    console.log("req.body in /getuser route", req.body);
    if (!req.user) return res.json({ result: "no user" });
    try {
      API.controller.getUser(req.user._id, (response) => {
        // console.log(
        //   "/getuser route res.json(scrubUser(response)",
        //   res.json(scrubUser(response))
        // );
        return res.json(scrubUser(response));
      });
    } catch (err) {
      throw err;
    }
  });

  app.post("/api/addsub", (req, res) => {
    console.log("req.session in addsub ===================", req.session);

    API.controller.addSubscription(req.user._id, req.body, (response) => {
      try {
        API.controller.getUser(req.user._id, (response) => {
          return res.json(scrubUser(response));
        });
      } catch (err) {
        throw err;
      }
    });
  });

  app.post("/api/removesub", (req, res) => {
    console.log("req.user in /removesub", req.user);
    API.controller.removeSubscription(req.user._id, req.body.id, (response) => {
      try {
        API.controller.getUser(req.user._id, (response) => {
          return res.json(scrubUser(response));
        });
      } catch (err) {
        throw err;
      }
    });
  });

  app.all("*", function (req, res) {
    res.redirect("https://submarine-sub-tracker.herokuapp.com/");
  });
};
