const express = require("express");
const userController = require("../../controllers/users.controller");
const imageController = require("../../controllers/images.controller");
const authController = require("../../controllers/auth.controller");
const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload")

const v1 = express.Router();


//Register, Login
v1.post("/users", userController.createUser());
v1.post("/login", authController.login());

//Page Home
v1.get("/images", authorization, imageController.getImages());
v1.get("/images/name/:name", authorization, imageController.getImagesByName());

//Page Chi tiết
v1.get("/images/:imageId", authorization, imageController.getImageById())
v1.get("/images/comments/:imageId", authorization, imageController.getImageCommentById())
v1.post("/images/save/:imageId", authorization, imageController.saveImage())
v1.get("/images/save/:imageId", authorization, imageController.getImageSavedById())
v1.post("/images/comments/:imageId", authorization, imageController.commentImage())

//Page quản lý
v1.get("/users", authorization, userController.getUsers());
v1.get("/users/getImagesSaved", authorization, userController.getImagesSavedByUserId());
v1.get("/users/getImagesPosted/:id", authorization, userController.getImagesPostedByUserId());
v1.delete("/images/:imageId", authorization, imageController.deleteImage())

//Page thêm ảnh
v1.post("/upload", authorization, upload.single("file"), imageController.uploadFile())
v1.post("/images", authorization, imageController.postImage())
v1.put("/users", authorization, userController.updateUser());

module.exports = v1;
