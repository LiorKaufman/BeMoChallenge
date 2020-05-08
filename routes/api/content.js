const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');

const Content = require('../../models/Content');

// @route POST api/content
// @desc Create new content
// @access Private
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

// @route PUT api/content/:id
// @desc Create new content
// @access Private
router.put('/:id', async (req, res) => {
  const data = JSON.stringify(req.body);

  try {
    let content = await Content.findById(req.params.id);

    if (content) {
      content.maintext = data;
    }

    await content.save();

    return res.json(content);
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

router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ msg: 'Content not found' });
    }

    res.json(content);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Content not found' });
    }

    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
