const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dummy = require('../data/dummydata');

function ensureUsers() {
  dummy.users = dummy.users || [];
  return dummy.users;
}

exports.handlerGetUsers = (req, res) => {
  try {
    res.json(ensureUsers());
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerGetUser = (req, res) => {
  try {
    const users = ensureUsers();
    const user = users.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

exports.handlerRegister = (req, res) => {
  try {
    const users = ensureUsers();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (users.find((u) => u.email === email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = {
      id: String(Date.now()),
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.handlerLogin = (req, res) => {
  try {
    const users = ensureUsers();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users.find((u) => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};