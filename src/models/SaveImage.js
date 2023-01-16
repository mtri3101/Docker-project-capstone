const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) =>{
    return sequelize.define(
        "Save",
        {
            userId:{
                type: DataTypes.INTEGER,
                field:"user_id",
            },
            imageId:{
                type: DataTypes.INTEGER,
                field:"image_id",
            },
            dateSave:{
                type: DataTypes.DATE,
                field: "date_save",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        },{
            tableName: "saves",
            timestamps: false,
        }
    )
}