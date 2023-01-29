const dbController = require("./databaseController");
const { v4: uuidv4 } = require("uuid");

exports.createClient = async (req, res) => {
  const id = uuidv4();
  try {
    await dbController.createClient({
      clientID: id,
      companyName: req.body.companyName,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      primaryPhone: req.body.primaryPhone,
      fax: req.body.fax,
      website: req.body.website,
    });
    res.status(201).json({
      message: "Client Added",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};

exports.createClientNote = async (req, res) => {
  try {
    await dbController.createClientNote({
      noteID: uuidv4(),
      data: req.body.note,
      timestamp: new Date(),
      author: res.user.fullName,
      client: req.body.client,
    });
    res.status(201).json({
      message: "Note Added",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};

exports.createClientContact = async (req, res) => {
  try {
    await dbController.createClientContact({
      contactID: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      primaryPhone: req.body.primaryPhone,
      cellPhone: req.body.cellPhone,
      client: req.body.client,
    });
    res.status(201).json({
      message: "Contact Created",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await dbController.updateUser(req.params.userID, {
      userID: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: req.body.fullName,
      email: req.body.email,
    });
    res.status(201).json({
      message: "User updated",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};
