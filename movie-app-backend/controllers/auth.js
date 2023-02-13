const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;
let jwt = require("jsonwebtoken");

exports.auth_signup_get = (request, response) => {
  response.render("auth/signup");
};

exports.auth_signup_post = (request, response) => {
  let user = new User(request.body);
  let hash = bcrypt.hashSync(request.body.password, salt);
  user.password = hash;
  user
    .save()
    .then(() => {
      response.json({ message: "User created successfully" });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.auth_signin_get = (request, response) => {
  response.render("auth/signin");
};

exports.auth_signin_post = async (request, response) => {
  const { email, password } = request.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return response.json({ message: "User not found" });

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return response.json({ message: "Password is incorrect" });

    const payload = {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    };

    jwt.sign(
      payload,
      process.env.SESSION_SECRET,
      { expiresIn: "24h" },
      (error, token) => {
        if (error) throw error;
        response.json({ token }).status(200);
      }
    );
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Server error" });
  }
};

exports.auth_logout_get = (request, response) => {
  // invalidate session
  request.logout(function (error) {
    if (error) {
      return next(error);
    }
    response.redirect("/auth/signin");
  });
};
