const { DB } = require("../config/db");
const DATABASE = require("./databaseController");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await DATABASE.getAllUsers();
    res.status(200).json({
      usersArray: users,
      YOU: res.user.fullName,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await DATABASE.getClients();
    res.status(200).json({
      clients: clients,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await DATABASE.getClient(req.params.clientID);
    const pinnedNote = await DATABASE.getClientPinnedNote(client.pinnedNote)
    res.status(200).json({
      client: client,
      pinnedNote: pinnedNote
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};

exports.getClientNotes = async (req, res) => {
  try {
    const notes = await DATABASE.getClientNotes(req.params.clientID);
    res.status(200).json({
      notes: notes,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};

exports.getAllClientContacts = async (req, res) => {
  try {
    const contacts = await DATABASE.getAllClientContacts(req.params.clientID);
    res.status(200).json({
      contacts: contacts,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
};

exports.getClientTickets = async (req, res) => {
  try {
    const tickets = await DATABASE.getClientTickets(req.params.clientID)
    res.status(200).json({
      tickets: tickets
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause,
    });
  }
}
// TODO: front end for projects
exports.getClientProjects = async (req, res) => {
  try {
    const projects = await DATABASE.getClientProjects(req.params.clientID)
    res.status(200).json({
      projects: projects
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      cause: error.cause
    })
  }
}