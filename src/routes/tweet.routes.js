import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/tweets:
 *   post:
 *     summary: Create a new tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the tweet
 *     responses:
 *       201:
 *         description: Tweet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tweet'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.route("/").post(createTweet);

/**
 * @swagger
 * /api/v1/tweets/user/{userId}:
 *   get:
 *     summary: Get all tweets by a user
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
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
 *         description: List of tweets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tweets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tweet'
 *                 totalTweets:
 *                   type: number
 *                 page:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.route("/user/:userId").get(getUserTweets);

/**
 * @swagger
 * /api/v1/tweets/{tweetId}:
 *   patch:
 *     summary: Update a tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tweet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the tweet
 *     responses:
 *       200:
 *         description: Tweet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tweet'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to update this tweet
 *       404:
 *         description: Tweet not found
 *   delete:
 *     summary: Delete a tweet
 *     tags: [Tweets]
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
 *         description: Tweet deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Not authorized to delete this tweet
 *       404:
 *         description: Tweet not found
 */
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
