
const express = require("express");
const { userRegister, userLogin, userUpdate, userDelete, getUserData, userGet, userSuggestion } = require("../controller/user.controller");

const UserRouter = express.Router();

UserRouter.post("/signup", userRegister);
UserRouter.post("/login", userLogin);
UserRouter.post("/single", getUserData);
UserRouter.patch("/edit/:UserId", userUpdate);
UserRouter.delete("/delete", userDelete);
UserRouter.get("/getuser", userGet);
UserRouter.get("/suggestions", userSuggestion);

module.exports = {
    UserRouter
};
