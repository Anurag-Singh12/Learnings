import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../Controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"   //multer middleware (not default export so, we have to import by using{} and same name as export)
import { verifyJWT } from "../Middlewares/auth.middleware.js";

//declare/initialize in variable

const router = Router();

router.route("/register").post(
  upload.fields([                                 //multer middleware
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser                    //this is a proper controller (ftn)
);

//router.route("/register").post(registerUser)             //http/localhost:8000/api/v1/users/register
// router.route("/login").post(logincode)                //http/localhost:8000/api/v1/users/login

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser )
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router;
