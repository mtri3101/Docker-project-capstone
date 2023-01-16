const { AppError } = require("../helpers/error");
const { User, Image, Comment } = require("../models");

const getImages = async () => {
    try {
        const images = await Image.findAll({
        })
        return images;
    } catch (error) {
        throw error
    }
}

const getImagesByName = async (name) => {
    console.log(name)
    try {
        const images = await Image.findOne({
            where: {
                imageName: name
            },
        })

        if (!images) {
            throw new AppError(404, "Image not found")
        }

        return images
    } catch (error) {
        throw error
    }
}

const getImageById = async (imageId) => {
    try {
        const image = await Image.findOne({
            where: {
                id: imageId
            },
            include: [
                {
                    association: "owner",
                    attributes: {
                        exclude: ["id", "password"],
                    },
                },
            ]
        })
        if (!image) {
            throw new AppError(404, "Image not found")
        }
        return image
    } catch (error) {
        throw error
    }
}

const getImageCommentById = async (imageId) => {
    try {
        const image = await Image.findOne({
            where: {
                id: imageId
            },
            include: [
                {
                    association: "userComments",
                    attributes: {
                        exclude: ["id", "password"],
                    },
                    through: {
                        attributes: {
                            exclude: ["imageId"]
                        }
                    }
                },
            ]
        })
        if (!image) {
            throw new AppError(404, "Image not found")
        }
        return image
    } catch (error) {
        throw error
    }
}

const getImageSavedById = async (imageId) => {
    try {
        const image = await Image.findOne({
            where: {
                id: imageId
            },
            include: [
                {
                    association: "userSaves",
                    attributes: {
                        exclude: ["id", "password"],
                    },
                    through: {
                        attributes: {
                            exclude: ["imageId"]
                        }
                    }
                },
            ]
        })
        if (!image) {
            throw new AppError(404, "Image not found")
        }
        return image
    } catch (error) {
        throw error
    }
}


const deleteImage = async (imageId) => {
    try {
        const image = await Image.findOne({
            where: {
                id: imageId
            },
        })
        if (!image) {
            throw new AppError(404, "Image not found");
        }
        await Image.destroy({ where: { id: imageId } })
    } catch (error) {
        throw error;
    }
}

const commentImage = async (token, imageId, content) => {
    try {
        const image = await Image.findByPk(imageId)
        if (!image) {
            throw new AppError(404, "Image not found");
        }

        const user = await Image.findByPk(token.id)
        if (!user) {
            throw new AppError(401, "Invalid or expired token");
        }

        if (content === '') {
            throw new AppError(400, "Please comment")
        }
        const comment = await image.addUserComment(user.id, { through: { content: content } })
        return comment

    } catch (error) {
        throw error;
    }
}

const saveImage = async (token, imageId) => {
    try {
        const image = await Image.findByPk(imageId)
        if (!image) {
            throw new AppError(404, "Image not found");
        }

        const user = await Image.findByPk(token.id)
        if (!user) {
            throw new AppError(401, "Invalid or expired token");
        }

        const comment = await image.addUserSave(user.id)
        return comment

    } catch (error) {
        throw error;
    }
}

const postImage = async (token, data) => {
    try {
        data["userId"] = token.id

        const postedImage = await Image.create(data);
        return postedImage
    } catch (error) {
        console.log(error)
        throw error

    }
}


module.exports = {
    getImages,
    getImagesByName,
    getImageById,
    getImageCommentById,
    getImageSavedById,
    deleteImage,
    commentImage,
    saveImage,
    postImage
}