const express = require("express");
const userController = require("../../controllers/users.controller");
const imageController = require("../../controllers/images.controller");
const authController = require("../../controllers/auth.controller");
const authorization = require("../../middlewares/authorization");
const upload = require("../../middlewares/upload")

const v1 = express.Router();


//Register, Login
v1.post("/users/register", userController.createUser());
v1.post("/users/login", authController.login());

//Page Home
v1.get("/images/getImages", authorization, imageController.getImages());
v1.get("/images/getImagesByName/:name", authorization, imageController.getImagesByName());

//Page Chi tiết
v1.get("/images/getImagesById/:imageId", authorization, imageController.getImageById())
v1.get("/images/getImageCommentById/:imageId", authorization, imageController.getImageCommentById())
v1.post("/images/saveImage/:imageId", authorization, imageController.saveImage())
v1.get("/images/getImageSavedById/:imageId", authorization, imageController.getImageSavedById())
v1.post("/images/commentImage/:imageId", authorization, imageController.commentImage())

//Page quản lý
v1.get("/users/getUsers", authorization, userController.getUsers());
v1.get("/users/getImagesSavedByUserId", authorization, userController.getImagesSavedByUserId());
v1.get("/users/getImagesPostedByUserId", authorization, userController.getImagesPostedByUserId());
v1.delete("/images/deleteImage/:imageId", authorization, imageController.deleteImage())

//Page thêm ảnh
v1.post("/upload", authorization, upload.single("file"), imageController.uploadFile())
v1.post("/images/postImage", authorization, imageController.postImage())
v1.put("/users/updateUser", authorization, userController.updateUser());

module.exports = v1;
