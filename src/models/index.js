const { Sequelize } = require("sequelize");
const configs = require("../config");

const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected");
  } catch (error) {
    console.log("Sequelize Error", error);
  }
})();

const User = require("./User")(sequelize);
const Image = require("./Image")(sequelize);
const Comment = require("./CommentImage")(sequelize);
const Save = require("./SaveImage")(sequelize)

//User 1-n Image
Image.belongsTo(User, { as: "owner", foreignKey: "userId" });
User.hasMany(Image, { as: "post", foreignKey: "userId" });

//User 1-n Comment
//Image 1-n Comment
User.belongsToMany(Image, {
  as: "imageComments",
  through: Comment,
  foreignKey: "userId"
});
Image.belongsToMany(User, {
  as: "userComments",
  through: Comment,
  foreignKey: "imageId"
});

//User 1-n Save
//Image 1-n Save
User.belongsToMany(Image, {
  as: "imageSaves",
  through: Save,
  foreignKey: "userId",
});
Image.belongsToMany(User, {
  as: "userSaves",
  through: Save,
  foreignKey: "imageId"
})


module.exports = {
  sequelize,
  User,
  Image,
  Comment
};
