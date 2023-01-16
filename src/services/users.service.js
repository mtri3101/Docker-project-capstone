const { AppError } = require("../helpers/error");
const { User } = require("../models");

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

const getImagesSavedByUserId = async (data) => {
  console.log(data)
  try {
    const user = await User.findOne({
      where: {
        id: data.id,
      },
      include: [
        {
          association: "imageSaves",
          attributes: {
            exclude: ["userId", "id"],
          },
          through: {
            attributes: {
              exclude: ["userId"]
            }
          }
        },
      ],
    });
    if (!user) {
      throw new AppError(404, "User not found")
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getImagesPostedByUserId = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        id: data.id,
      },
      include: [
        {
          association: "post",
          attributes: {
            exclude: ["userId"],
          },
        },
      ],
    });
    return user;
  } catch (error) {
    throw error;
  }
};


const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new AppError(404, "Email is existed");
    }

    if (!data.password) {
      value = Math.random().toString(36).substring(2);
    }

    const createdUser = await User.create(data);
    return createdUser;
  } catch (error) {
    throw error;
  }
};


const updateUser = async (token, data) => {
  try {
    const user = await User.findOne({
      where: {
        id: token.id,
      },
    });

    if (!user) {
      throw new AppError(401, "Invalid or expired token");
    }
    const userUpdate = await User.update(data, { where: { id: token.id } });
    return userUpdate;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  getImagesSavedByUserId,
  getImagesPostedByUserId,
  createUser,
  updateUser,
};
