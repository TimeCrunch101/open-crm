const { DB } = require("../config/db");
const { removeNonPOC } = require('../utils/handlePOC')

/**
 * @returns All users as an Array
 */

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    DB.query(
      "SELECT userID, firstName, lastName, fullName, email, enabled FROM users",
      (err, data) => {
        try {
          if (err)
            throw new Error("Could not get users", { cause: err.message });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

/**
 * @param {string} email Email to look up
 * @returns The user Object
 */

exports.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    DB.query("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
      try {
        if (err) throw new Error("Could not retrieve the user", {cause: err.message,});
        if (user[0].enabled===0) throw new Error('Could not login', {cause: "Please contact your administrator"})
        resolve(user[0]);
      } catch (err) {
        reject(err);
      }
    });
  });
};

/**
 * @param {string} userID Automatically created by application
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} fullName
 * @param {string} email
 * @param {string} passwordHash
 * @param {number} enabled 1 for True 0 for False
 * @returns true if the user was created, rejects with new Error()
 */

exports.createUser = (
  userID,
  firstName,
  lastName,
  fullName,
  email,
  passwordHash
) => {
  return new Promise((resolve, reject) => {
    DB.query(
      "INSERT INTO users SET ?",
      {
        userID: userID,
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        email: email,
        password: passwordHash,
        enabled: 1,
      },
      (err) => {
        try {
          if (err) {
            if (err.message === `Duplicate entry '${email}' for key 'users.email_UNIQUE'`) {
              throw new Error("Could not create user in database", {cause: "That email is already in use",});
            } else {
              throw new Error("Could not create user in database", {cause: err.message,});
            }
          }
          resolve(true);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};

/**
 * @param {string} userID The ID of the user
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.disableUser = (userID) => {
  return new Promise((resolve, reject) => {
    DB.query("UPDATE users SET enabled = 0 WHERE userID = ?", [userID], (err) => {
      try {
        if (err)
          throw new Error("Could not disable user", { cause: err.message });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  });
};

/**
 * @param {string} userID The ID of the user
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.enableUser = (userID) => {
  return new Promise((resolve, reject) => {
    DB.query("UPDATE users SET enabled = 1 WHERE userID = ?",[userID], (err) => {
      try {
        if (err) throw new Error('Could not enable user', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {number} id The ID of the user
 * @param {object} user The user Object
 * @param {string} user.firstName
 * @param {string} user.lastName
 * @param {string} user.fullName
 * @param {string} user.email
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    DB.query(
      "UPDATE users SET firstName = ?, lastName = ?, fullName = ?, email = ? WHERE id = ?",
      [user.firstName, user.lastName, user.fullName, user.email, id],
      (err) => {
        try {
          if (err)
            throw new Error("Could not update the user", {
              cause: err.message,
            });
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

/**
 * @param {string} userID The ID of the user
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.deleteUser = (userID) => {
  return new Promise((resolve, reject) => {
    DB.query("DELETE FROM users WHERE userID = ?",[userID],(err) => {
      try {
        if (err) throw new Error('Could not delete user', {cause: err.cause})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {object} company
 * @param {string} company.clientID
 * @param {string} company.companyName
 * @param {string} company.street
 * @param {string} company.city
 * @param {string} company.state
 * @param {string} company.zip
 * @param {string} company.country
 * @param {string} company.primaryPhone
 * @param {string} company.fax
 * @param {string} company.website
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createClient = (company) => {
  return new Promise((resolve, reject) => {
    DB.query(
      "INSERT INTO clients SET ?",
      {
        clientID: company.clientID,
        companyName: company.companyName,
        street: company.street,
        city: company.city,
        state: company.state,
        zip: company.zip,
        country: company.country,
        primaryPhone: company.primaryPhone,
        fax: company.fax,
        website: company.website,
      },
      (err) => {
        try {
          if (err)
            throw new Error("Could not create client", { cause: err.message });
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

/**
 * @returns A promise, resolves with an Array of clients, or rejects with an error Object
 */

exports.getClients = () => {
  return new Promise((resolve, reject) => {
    DB.query("SELECT * FROM clients", (err, data) => {
      try {
        if (err)
          throw new Error("Could not retrieve client list", {
            cause: err.message,
          });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
};

/**
 * @param {string} clientID 
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.getClient = (clientID) => {
  return new Promise((resolve, reject) => {
    DB.query("SELECT * FROM clients WHERE clientID = ?",[clientID],(err, data) => {
        try {
          if (err) throw new Error("Could not retrieve client information", {cause: err.message});
          resolve(data[0]);
        } catch (error) {
          reject(err);
        }
      }
    );
  });
};

/**
 * 
 * @param {string} noteID The ID of the note
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.getClientPinnedNote = (noteID) => {
  return new Promise((resolve, reject) => {
    DB.query("SELECT * from client_notes WHERE noteID = ?",[noteID],(err, note) => {
      try {
        if (err) throw new Error('Could not get pinned note', {cause: err.message})
        resolve(note[0])
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} clientID The ID of the client
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.deleteClient = (clientID) => {
  return new Promise((resolve, reject) => {
    DB.query("DELETE FROM clients WHERE clientID = ?", [clientID], (err) => {
      try {
        if (err) throw new Error("Could not delete the client", {cause: err.message,});
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  });
};

// TODO: updateClient(clientID)

/**
 * @param {object} contact The Contact Object
 * @param {string} contact.contactID
 * @param {string} contact.firstName
 * @param {string} contact.lastName
 * @param {string} contact.fullName
 * @param {string} contact.email
 * @param {string} contact.primaryPhone
 * @param {string} contact.cellPhone
 * @param {number} contact.client
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createClientContact = (contact) => {
  return new Promise((resolve, reject) => {
    DB.query(
      "INSERT INTO contacts SET ?",
      {
        contactID: contact.contactID,
        firstName: contact.firstName,
        lastName: contact.lastName,
        fullName: contact.fullName,
        email: contact.email,
        primaryPhone: contact.primaryPhone,
        cellPhone: contact.cellPhone,
        client: contact.client,
      },
      (err) => {
        try {
          if (err)
            throw new Error("Could not create contact", { cause: err.message });
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

/**
 * @param {string} clientID The UUID of the client
 * @returns
 */

exports.getAllClientContacts = (clientID) => {
  return new Promise((resolve, reject) => {
    DB.query("SELECT * FROM contacts WHERE client = ?", [clientID], (err, contacts) => {
        try {
          if (err) throw new Error("Could not retrieve contact list", {cause: err.message});
          resolve(contacts);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

// TODO: updateClientContact()

/**
 * @param {string} contactID 
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.DeleteClientContact = (contactID) => {
  return new Promise((resolve, reject) => {
    DB.query("DELETE FROM contacts WHERE contactID = ?",[contactID],(err) => {
      try {
        if (err) throw new Error('Could not delete contact', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  })
}

/**
 * @param {object} note The Note Object
 * @param {string} note.noteID The note ID
 * @param {string} note.data The message body
 * @param {string} note.timestamp A time stamp should be generated new Date()
 * @param {string} note.author Who wrote the note
 * @param {number} note.client The ID of the client the note should be assigned to
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createClientNote = (note) => {
  return new Promise((resolve, reject) => {
    DB.query(
      "INSERT INTO client_notes SET ?",
      {
        noteID: note.noteID,
        note: note.data,
        timestamp: note.timestamp,
        author: note.author,
        client: note.client,
      },
      (err) => {
        try {
          if (err)
            throw new Error("Could not create the note", {
              cause: err.message,
            });
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

/**
 * @param {string} clientID The ID of the client
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.getClientNotes = (clientID) => {
  return new Promise((resolve, reject) => {
    DB.query(
      "SELECT * FROM client_notes WHERE client = ?",
      [clientID],
      (err, notes) => {
        try {
          if (err)
            throw new Error("Could not retrieve notes", { cause: err.message });
          resolve(notes);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

/**
 * @param {string} noteID The Note ID
 * @param {string} clientID The Client ID
 * @returns 
 */

exports.pinClientNote = (noteID, clientID) => {
  return new Promise((resolve, reject) => {
    DB.query("UPDATE clients SET pinnedNote = ? WHERE clientID = ?",[noteID, clientID], (err) => {
      try {
        if (err) throw new Error('Could not pin note', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

// TODO: updateClientNote()

/**
 * @param {string} noteID 
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.deleteClientNote = (noteID) => {
  return new Promise((resolve, reject) => {
    DB.query("DELETE FROM client_notes WHERE noteID = ?",[noteID],(err) => {
      try {
        if (err) throw new Error('Could not delete note', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} noteID 
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.DeleteClientNote = (noteID) => {
  return new Promise((resolve, reject) => {
    DB.query("DELETE FROM client_notes WHERE noteID = ?",[noteID],(err) => {
      try {
        if (err) throw new Error("Could not delete note", {cause: err.cause})
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  })
}

/**
 * @param {object} ticketObj The ticket object
 * @param {string} ticketObj.ticketID The ID of the ticket generated by UUID()
 * @param {string} ticketObj.ticketNumber The number of the ticket generated by new Date() in postController.js
 * @param {string} ticketObj.client The client UUID
 * @param {string} ticketObj.ticketContact The contact UUID
 * @param {string} ticketObj.resource The user UUID
 * @param {string} ticketObj.title The ticket title
 * @param {string} ticketObj.description The ticket description
 * @param {string} ticketObj.created new Date()
 * @param {string} ticketObj.status The ticket status (new, closed, in progress, waiting on client...)
 * @param {string} ticketObj.priority The ticket priority (low, medium, high, critical..)
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    DB.query("INSERT INTO tickets SET ?",{
      ticketID: ticketObj.ticketID,
      ticketNumber: ticketObj.ticketNumber,
      client: ticketObj.client,
      ticketContact: ticketObj.ticketContact,
      resource: ticketObj.resource,
      title: ticketObj.title,
      description: ticketObj.description,
      created: ticketObj.created,
      status: ticketObj.status,
      priority: ticketObj.priority,
    },(err) => {
      try {
        if (err) throw new Error("Could not create ticket", {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} clientID The ID of the client
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.getClientTickets = (clientID) => {
  return new Promise((resolve, reject) => {
    DB.query('SELECT * FROM tickets WHERE client = ? ORDER BY created DESC',[clientID], (err, tickets) => {
      try {
        if (err) throw new Error('Could not get tickets', {cause: err.message})
        resolve(tickets)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {object} projectObj The Project Object
 * @param {string} projectObj.projectID
 * @param {string} projectObj.client
 * @param {string} projectObj.title
 * @param {string} projectObj.projectNumber
 * @param {string} projectObj.summary
 * @param {string} projectObj.created
 * @param {string} projectObj.due
 * @param {number} projectObj.projectedHours
 * @param {number} projectObj.hoursWorked
 * @param {string} projectObj.primaryResource
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createProject = (projectObj) => {
  return new Promise((resolve, reject) => {
    DB.query("INSERT INTO projects SET ?",{
      projectID: projectObj.projectID,
      client: projectObj.client,
      title: projectObj.title,
      projectNumber: projectObj.projectNumber,
      summary: projectObj.summary,
      created: projectObj.created,
      due: projectObj.due,
      projectedHours: projectObj.projectedHours,
      hoursWorked: projectObj.hoursWorked,
      primaryResource: projectObj.primaryResource,
    }, (err) => {
      try {
        if (err) throw new Error('Could not create project', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} clientID The client ID
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.getClientProjects = (clientID) => {
  return new Promise((resolve, reject) => {
    DB.query("SELECT * from projects WHERE client = ?", [clientID], (err, projects) => {
      try {
        if (err) throw new Error('Could not select projects', {cause: err.message})
        resolve(projects)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} clientID The clientID
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.unpinNote = (clientID) => {
  return new Promise((resolve, reject) => {
    DB.query("UPDATE clients SET pinnedNote = null WHERE clientID = ?",[clientID],(err) => {
      try {
        if (err) throw new Error('Could not unpin the note', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} contactID Contact ID
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.deleteClientContact = (contactID) => {
  return new Promise((resolve, reject) => {
    DB.query("DELETE FROM contacts WHERE contactID = ?", [contactID], (err) => {
      try {
        if (err) throw new Error('Could not delete contact', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {object} contact The contact Object
 * @param {string} contact.contactID contact ID
 * @param {string} contact.firstName contact last name
 * @param {string} contact.lastName contact first name
 * @param {string} contact.fullName firstname + lastname
 * @param {string} contact.email contact email
 * @param {string} contact.primaryPhone contact primary number
 * @param {string} contact.cellPhone contact cell number
 * @param {string} contact.client the Client ID
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.createClientContact = (contact) => {
  return new Promise((resolve, reject) => {
    DB.query("INSERT INTO contacts SET ?", {
      contactID: contact.contactID,
      firstName: contact.firstName,
      lastName: contact.lastName,
      fullName: contact.fullName,
      email: contact.email,
      primaryPhone: contact.primaryPhone,
      cellPhone: contact.cellPhone,
      client: contact.client,
    }, (err) => {
      try {
        if (err) throw new Error('Could not create contact', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} contactID The contact ID
 * @param {string} clientID The Client ID
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.setClientPOC = (contactID, clientID) => {
  return new Promise(async(resolve, reject) => {
    await removeNonPOC(contactID, clientID)
    DB.query("UPDATE clients SET POC = ? WHERE clientID = ?",[contactID, clientID], (err)=> {
      try {
        if (err) throw new Error('Could not set POC', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} contactID The contact ID
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.getClientPOC = (contactID) => {
  return new Promise((resolve, reject) => {
    DB.query("SELECT * FROM contacts WHERE contactID = ?",[contactID],(err, contact) => {
      try {
        if (err) throw new Error('Could not get POC', {cause: err.message})
        resolve(contact[0])
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * @param {string} contactID The contact ID
 * @returns A promise, resolves true if successful, rejects with an error Object if the query failed
 */

exports.updateContactSetPOC = (contactID) => {
  return new Promise((resolve, reject) => {
    DB.query("UPDATE contacts SET isPOC = 1 WHERE contactID = ?", [contactID], (err) => {
      try {
        if (err) throw new Error('Could not update contact', {cause: err.message})
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}