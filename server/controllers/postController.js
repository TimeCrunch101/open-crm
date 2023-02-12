const dbController = require("./databaseController");
const {projectNumGen} = require('../utils/projectNumGen');
const {ticketNumGen} = require('../utils/ticketNumGen')
const {getDate} = require('../utils/date')
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
      client: req.body.clientID,
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

exports.pinClientNote = async (req, res) => {
  try {
    await dbController.pinClientNote(req.body.noteID,req.params.clientID)
    res.status(200).json({
      message: 'Successfully Pinned Note'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.createClientContact = async (req, res) => {
  try {
    await dbController.createClientContact({
      contactID: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
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

exports.deleteNote = async (req, res) => {
  try {
    await dbController.deleteClientNote(req.params.noteID)
    res.status(200).json({
      message: 'Note Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.deleteClient = async (req, res) => {
  try {
    await dbController.deleteClient(req.params.clientID)
    res.status(200).json({
      message: 'Client Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await dbController.deleteUser(req.params.userID)
    res.status(200).json({
      message: 'User Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.disableUser = async (req, res) => {
  try {
    await dbController.disableUser(req.params.userID)
    res.status(200).json({
      message: 'User Disabled'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.enableUser = async (req, res) => {
  try {
    await dbController.enableUser(req.params.userID)
    res.status(200).json({
      message: 'User Enabled'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.createTicket = async (req, res) => {
  try {
    const ticketNumber = await ticketNumGen()
    const dateCreated = await getDate(new Date())
    await dbController.createTicket({
      ticketID: uuidv4(),
      ticketNumber: ticketNumber,
      client: req.body.client,
      ticketContact: req.body.ticketContact,
      resource: req.body.resource,
      title: req.body.title,
      description: req.body.description,
      created: dateCreated,
      status: req.body.status,
      priority: req.body.priority,
    })
    res.status(200).json({
      message: 'Ticket Created'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.createProject = async (req, res) => {
  try {
    const projectNumber = await projectNumGen()
    const date = await getDate(new Date())
    await dbController.createProject({
      projectID: uuidv4(),
      client: req.body.clientID,
      title: req.body.title,
      projectNumber: projectNumber,
      summary: req.body.summary,
      created: date,
      due: req.body.due,
      projectedHours: req.body.projectedHours,
      hoursWorked: 0,
      primaryResource: req.body.primaryResource,
    })
    res.status(200).json({
      message: 'Project Created'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.unpinNote = async (req, res) => {
  try {
    await dbController.unpinNote(req.params.clientID)
    res.status(200).json({
      message: 'The note was unpinned'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}

exports.deleteClientContact = async (req, res) => {
  try {
    await dbController.deleteClientContact(req.params.contactID)
    res.status(200).json({
      message: 'Contact Deleted'
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}