const { response } = require("../helpers/response");
const userService = require("../services/users.service");

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(response(users));
    } catch (error) {
      next(error);
    }
  };
};

const getImagesSavedByUserId = () => {
  return async (req, res, next) => {
    console.log(res.locals.user)
    try {
      const {user} = res.locals;
      const userData = await userService.getImagesSavedByUserId(user);
      res.status(200).json({ data: userData });
    } catch (error) {
      next(error);
    }
  };
};

const getImagesPostedByUserId = () => {
  return async (req, res, next) => {
    try {
      const {user} = res.locals;
      const userData = await userService.getImagesPostedByUserId(user);
      res.status(200).json({ data: userData });
    } catch (error) {
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const user = req.body;
      const createdUser = await userService.createUser(user);
      res.status(200).json(response(createdUser));
    } catch (error) {
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;

      await userService.deleteUser(id);
      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const {user} = res.locals;
      const data = req.body;
      await userService.updateUser(user,data);
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  };
};


module.exports = {
  getUsers,
  getImagesSavedByUserId,
  getImagesPostedByUserId,
  createUser,
  deleteUser,
  updateUser,
};
