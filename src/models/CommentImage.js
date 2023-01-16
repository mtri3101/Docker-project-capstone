const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "Comment",
        {
            userId: {
                type: DataTypes.INTEGER,
                field: "user_id",
            },
            imageId: {
                type: DataTypes.INTEGER,
                field: "image_id",
            },
            content:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            dateComment: {
                type: DataTypes.DATE,
                field: "date_comment",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        },
        {
            tableName: "comments",
            timestamps: false,
        }
    );
};