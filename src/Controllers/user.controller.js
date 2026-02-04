import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../Models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


/*  get user details from frontend
    validation - not empty
    check if user already exists: username, email
    check for images, check for avatar
    upload them to cloudinary, avatar
    create user object - create entry in db
    remove password and refresh token field from response
    check for user creation
    return res   */

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  //console.log("email: ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")    //if any field is empty throw error
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({                                          //existed User checking by using user model
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;                                //check for img - .files .path  (properties of multer)
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    //for cover img empty check
    let coverImageLocalPath;                                                                              //store the local file path of an uploaded img
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {               //cover img check
        coverImageLocalPath = req.files.coverImage[0].path
    }

     if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)                               //upload on cloudinary
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({                                                      //Create DB entry 
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

     const createdUser = await User.findById(user._id).select(                           //check user created? and remove pass&tokens
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(                                                          //return response if user is created properly
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

});



// const registerUser = asyncHandler( async (req, res) => {
//     res.status(200).json({
//         message : "OK"
//     })
// })


export { registerUser };
