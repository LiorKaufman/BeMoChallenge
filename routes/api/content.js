const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');

const Content = require('../../models/Content');

router.post('/', async (req, res) => {
  const data = JSON.stringify(req.body);

  try {
    let content = await new Content({
      maintext: data,
    });

    await content.save();

    return res.json({ content });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const contents = await Content.find();

    res.json(contents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
