const express = require('express');
const router = express.Router();

// Helpers
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const config = require('config');

// Middleware
const auth = require('../../middleware/auth');

//Models
const User = require('../../models/User');

// @route GET api/auth
// @desc T
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log('an error form api auth get route', error);

    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/auth
// @desc Login user
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Please is required').exists(),
  ],
  async (req, res) => {
    const errorsArr = validationResult(req);
    if (!errorsArr.isEmpty()) {
      return res.status(400).json({ errors: errorsArr.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // See if user exists
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
