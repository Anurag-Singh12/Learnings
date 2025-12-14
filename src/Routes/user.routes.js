import { Router } from "express";
import { registerUser } from "../Controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

//declare/initialize in variable

const router = Router();

router.route("/register").post(
  upload.fields([           //multer middleware
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);



//router.route("/register").post(registerUser)             //http/localhost:8000/api/v1/users/register
// router.route("/login").post(logincode)                //http/localhost:8000/api/v1/users/login


export default router;
