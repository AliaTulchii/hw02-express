const Joi = require("joi");

const contacts = require ("../models/contacts")

const { HttpError, ctrlWrapper } = require("../helpers")

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})
  

const getAll = async (req, res, next) => {
    
    const result = await contacts.listContacts();
    res.json(result);
    
}

const getById = async (req, res, next) => {
    
      const { contactId } = req.params;
      const result = await contacts.getContactById(contactId);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    
}
  
const add = async (req, res, next) => {
    
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
    
    res.json({ message: 'template message' })
}
  

const remove = async (req, res, next) => {
    
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json({
        message: "Delete success",
      })
    
    
    res.json({ message: 'template message' })
}
  
const update = async (req, res, next) => {
    
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message);
      }
      const { contactId } = req.params;
      const result = await contacts.updateContactById(contactId, req.body);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    
  }

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    remove: ctrlWrapper(remove),
    update: ctrlWrapper(update),
}