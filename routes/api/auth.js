import express from "express";
import authController from "../../controllers/auth.js";
import {
  validationBody,
  isEmptyBody,
  authenticate,
  upload,
  isEmptyFileBody,
} from "../../middlewares/index.js";
import {
  userValidationSchema,
  userSubscriptionValidationSchema,
  userEmailValidation,
} from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validationBody(userValidationSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validationBody(userValidationSchema),
  authController.login
);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  validationBody(userEmailValidation),
  authController.resendVerify
);

authRouter.patch(
  "",
  authenticate,
  isEmptyBody,
  validationBody(userSubscriptionValidationSchema),
  authController.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  isEmptyFileBody,
  authController.updateAvatar
);

export default authRouter;
