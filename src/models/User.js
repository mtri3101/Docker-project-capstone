const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");


module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING(50),
        field: "full_name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashedPassword);
        },
      },
      age:{
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "users",
      timestamps: false,
      unique:"email",
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      hooks: {
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
