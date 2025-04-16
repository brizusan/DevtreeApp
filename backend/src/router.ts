import express from "express";
import { body } from "express-validator";
import {
  createAccount,
  getUser,
  getUserByHandle,
  login,
  searchHandler,
  updateProfile,
  uploadImage,
} from "./handlers";
import { handleInputErrors } from "./middlewares";
import { authenticateUser } from "./middlewares/auth";

const router = express.Router();

/*** AUTHENTICATION ROUTES ***/

router.post(
  "/auth/register",
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email")
    .isEmail()
    .withMessage("Email not valid")
    .notEmpty()
    .withMessage("Full name is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("handle").notEmpty().withMessage("Handle is required"),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email")
    .isEmail()
    .withMessage("Email not valid")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  handleInputErrors,
  login
);

router.get("/user", authenticateUser, getUser);
router.post(
  "/user",
  body("handle").notEmpty().withMessage("Alias is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  authenticateUser,
  updateProfile
);

router.post("/user/image", authenticateUser, uploadImage);

router.get("/user/:handleUser", getUserByHandle);

router.post(
  "/search",
  body("handle").notEmpty().withMessage("Alias is required"),
  handleInputErrors,
  searchHandler
);

export default router;
