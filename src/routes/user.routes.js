import { Router } from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getWatchHistory,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();
/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - fullname
 *               - avatar
 *             properties:
 *               fullname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               avatar:
 *                 type: string
 *                 format: binary
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: User with email or username already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: User with email or username already exists
 *                 errors:
 *                   type: array
 *                   items: {}
 *                   example: []
 *       500:
 *         description: Cloudinary Bug or MongoDB bug
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Something went wrong while registering the user and images were deleted
 *                 errors:
 *                   type: array
 *                   items: {}
 *                   example: []
 */
router.route("/register").post(
  upload.fields([
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

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 example: string1
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQ...
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQ...
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                
 *       401:
 *         description: Entered wrong email or username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: User doesn't exit
 *                 errors:
 *                   type: array
 *                   items: {}
 *                   example: []
 *       404:
 *         description: Entered wrong Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Invalid user credentials
 *                 errors:
 *                   type: array
 *                   items: {}
 *                   example: []
 */
router.route("/login").post(loginUser);

/**
* @swagger
* /api/v1/users/refresh-token:
*   post:
*     summary: Refresh access token
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - refreshToken
*             properties:
*               refreshToken:
*                 type: string
*                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*     responses:
*       200:
*         description: Token refreshed successfully (tokens are stored in cookies also)
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 accessToken:
*                   type: string
*                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*       401:
*         description: Login first to refresh token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: false
*                 error:
*                   type: string
*                   example: Unauthorized request
*                 errors:
*                   type: array
*                   items: {}
*                   example: []
*       500:
*         description: Something went wrong while refreshing the access token
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: false
*                 error:
*                   type: string
*                   example: Something went wrong while refreshing the access token 
*/router.route("/refresh-token").post(verifyJWT,refreshAccessToken);

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Click to logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: User logged out successfully
 *                 errors:
 *                   type: array
 *                   items: {}
 *                   example: []
 *       401:
 *         description: Login first to logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Unauthorized request
 *                 errors:
 *                   type: array
 *                   items: {}
 *                   example: []
 */
router.route("/logout").post(verifyJWT, logoutUser);

/**
 * @swagger
 * /api/v1/users/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *      
 *       401:
 *         description: Invalid old password or unauthorized request(login first to change password)
 */
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

/**
 * @swagger
 * /api/v1/users/current-user:
 *   get:
 *     summary: Get current user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   example: Current user details
 *                 success:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized Access (login first to get current user details)
 */
router.route("/current-user").get(verifyJWT, getCurrentUser);

/**
 * @swagger
 * /api/v1/users/channel/{username}:
 *   get:
 *     summary: Get user channel profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the channel
 *     responses:
 *       200:
 *         description: Channel profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 channel:
 *                   $ref: '#/components/schemas/User'
 *                 videos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *       404:
 *         description: Channel not found
 */
router.route("/channel/:username").get(verifyJWT, getUserChannelProfile);

/**
 * @swagger
 * /api/v1/users/update-account:
 *   patch:
 *     summary: Update user account details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Account details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Fullname and email are required
 *       401:
 *         description: Unauthorized Access (login first to update account details)
 */
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

/**
 * @swagger
 * /api/v1/users/avatar:
 *   patch:
 *     summary: Update user avatar
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Avatar file is missing or error while uploading the avatar on cloudinary.
 *       401:
 *         description: Unauthorized Access (login first to update avatar).
 */
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

/**
 * @swagger
 * /api/v1/users/cover-image:
 *   patch:
 *     summary: Update user cover image
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - coverImage
 *             properties:
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cover image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Cover image file is missing or error while uploading the cover image on cloudinary.
 *       401:
 *         description: Unauthorized Access (login first to update cover image).
 */
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

/**
 * @swagger
 * /api/v1/users/history:
 *   get:
 *     summary: Get user watch history
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watch history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 videos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *       401:
 *         description: Unauthorized Access (login first to get watch history).
 */
router.route("/history").get(verifyJWT, getWatchHistory);

export default router;
