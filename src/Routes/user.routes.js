import { Router } from "express";
import { registerUser } from "../Controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"   //multer middleware (not default export so, we have to import by using{} and same name as export)

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


export default router;
