const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response")
const imageService = require("../services/images.service")

const getImages = () => {
    return async (req, res, next) => {
        try {
            const images = await imageService.getImages();
            res.status(200).json(response(images))
        } catch (error) {
            next(error)
        };
    }
}

const getImagesByName = () => {
    return async (req, res, next) => {
        try {
            const { name } = req.params;
            const imagesFound = await imageService.getImagesByName(name);
            res.status(200).json({ data: imagesFound })
        } catch (error) {
            next(error);
        }
    }
}

const getImageById = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const image = await imageService.getImageById(imageId);
            res.status(200).json({ data: image })
        } catch (error) {
            next(error)
        }
    }
}

const getImageCommentById = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const image = await imageService.getImageCommentById(imageId);
            res.status(200).json({ data: image })
        } catch (error) {
            next(error)
        }
    }
}

const getImageSavedById = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const image = await imageService.getImageSavedById(imageId);
            res.status(200).json({ data: image })
        } catch (error) {
            next(error)
        }
    }
}

const deleteImage = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            await imageService.deleteImage(imageId)
            res.status(200).json(response(true))
        } catch (error) {
            next(error)
        }
    }
}

const commentImage = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const {user} = res.locals;
            const {content } = req.body;
            const comment = await imageService.commentImage(user, imageId, content)
            res.status(200).json(response({ data: comment }))
        } catch (error) {
            next(error)
        }
    }
}

const saveImage = () => {
    return async (req, res, next) => {
        try {
            const { imageId } = req.params;
            const {user} = res.locals;
            const comment = await imageService.saveImage(user, imageId)
            res.status(200).json(response({ data: comment }))
        } catch (error) {
            next(error)
        }
    }
}

const uploadFile = () => {
    return async (req, res, next) => {
        const file = req.file;
        if (!file) {
            next(new AppError(400, "Please update a file"))
        }
        const tempUrl = `https://docker-project-capstone-production.up.railway.app/static/${file.path}`;
        const newUrl = tempUrl.replace("static\\", "");
        res.status(200).json(response(newUrl))
    };
}

const postImage = () => {
    return async (req, res, next) => {
        try {
            const { user } = res.locals;
            const data = req.body;
            const image = await imageService.postImage(user,data)
            res.status(200).json(response({ data: image }))
        } catch (error) {
            next(error)
        }
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
    uploadFile,
    saveImage,
    postImage
}