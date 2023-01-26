const DATABASE = require("./databaseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ", 2);
    const user = jwt.verify(token[1], process.env.JWT_SKEY);
    res.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are unauthorized", // FIXME: Better error messages for the end user
    });
  }
};

exports.isNotAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ", 2);
    jwt.verify(token[1], process.env.JWT_SKEY);
    res.status(400).json({
      message: "You are already logged in", // FIXME: Better error messages for the end user
    });
  } catch (error) {
    next();
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await DATABASE.getUserByEmail(req.body.username);
    if (user === undefined) {
      res.status(401).json({
        message: "Your username or password is incorrect", // FIXME: Better error messages for the end user
      });
    } else {
      const passMatch = await bcrypt.compare(req.body.password, user.password);
      if (passMatch) {
        const token = jwt.sign(
          {
            uuid: user.uuid,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            email: user.email,
          },
          process.env.JWT_SKEY,
          //{ expiresIn: "15s" } // FIXME: Update for production
        );

        res.status(200).json({
          fullName: user.fullName,
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Your username or password is incorrect", // FIXME: Better error messages for the end user
        });
      }
    }
  } catch (error) {
    res.status(500).json({ // FIXME: Better error messages for the end user
      error: error.message,
      cause: error.cause,
      stack: error.stack,
    });
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const fullName = `${firstName} ${lastName}`;
  const uuid = uuidv4();
  try {
    await DATABASE.createUser(uuid, firstName, lastName, fullName, email, hash);
    res.status(200).json({
      message: "You have successfully registered",
    });
  } catch (error) {
    res.status(500).json({ // FIXME: Better error messages for the end user
      error: error.message,
      cause: error.cause,
    });
  }
};

// getRouter.get("/api/validate", auth.isAuthenticated, auth.validate);
// On protected routes in the Vue application, a validation check is preformed.
// If auth.isAuthenticated succeeds then this will be called.
exports.validate = (req, res) => { 
  res.status(200).json({
    validation: true,
  });
};
