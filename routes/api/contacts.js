const express = require('express');
const Joi = require("joi");

const contacts = require ("../../models/contacts")

const {HttpError} = require("../../helpers")

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result);
  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message: "Not found",
      // })
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
    catch (error) {
    next(error);
  }
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success",
    })
  } catch (error) {
    next(error);
  }
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
})

module.exports = router
