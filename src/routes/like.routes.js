import { Router } from "express";
import {
  getLikedVideos,
  toggleCommentLike,
  toggleVideoLike,
  toggleTweetLike,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/likes/video/{videoId}:
 *   post:
 *     summary: Toggle like on a video
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the video
 *     responses:
 *       200:
 *         description: Video like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   description: Whether the video is now liked by the user
 *       400:
 *         description: Invalid video ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Video not found
 */
router.route("/video/:videoId").post(toggleVideoLike);

/**
 * @swagger
 * /api/v1/likes/comment/{commentId}:
 *   post:
 *     summary: Toggle like on a comment
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Comment like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   description: Whether the comment is now liked by the user
 *       400:
 *         description: Invalid comment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.route("/comment/:commentId").post(toggleCommentLike);

/**
 * @swagger
 * /api/v1/likes/tweet/{tweetId}:
 *   post:
 *     summary: Toggle like on a tweet
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tweet
 *     responses:
 *       200:
 *         description: Tweet like status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked:
 *                   type: boolean
 *                   description: Whether the tweet is now liked by the user
 *       400:
 *         description: Invalid tweet ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tweet not found
 */
router.route("/tweet/:tweetId").post(toggleTweetLike);

/**
 * @swagger
 * /api/v1/likes/videos:
 *   get:
 *     summary: Get all videos liked by the user
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of liked videos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likedVideos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *                 totalLikes:
 *                   type: number
 *                 page:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
router.route("/videos").get(getLikedVideos);

export default router;
