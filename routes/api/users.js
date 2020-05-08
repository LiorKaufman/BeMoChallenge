const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with 5 or more characters'
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errorsArr = validationResult(req);
    if (!errorsArr.isEmpty()) {
      return res.status(400).json({ errors: errorsArr.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // See if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      // generate salt for encryption
      const salt = await bcrypt.genSalt(10);
      //Encrypt password
      user.password = await bcrypt.hash(password, salt);

      // Create the user
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
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
