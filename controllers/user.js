const uuid = require("uuid");
const { User } = require("../models");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    const mappedUsers = users.map((user) => {
      return {
        id: user._id,
        userName: user.userName,
        email: user.email,
        password: user.password,
      };
    });
    res.status(200).json({ users: mappedUsers });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      id: uuid.v4(),
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;
    const updatedUser = await user.save();
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    await user.destroy();
    res.status(204).end();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
