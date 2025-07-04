import { Router } from "express";
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/dashboard/stats:
 *   get:
 *     summary: Get channel statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Channel statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSubscribers:
 *                   type: number
 *                   description: Total number of subscribers
 *                 totalVideos:
 *                   type: number
 *                   description: Total number of videos
 *                 totalViews:
 *                   type: number
 *                   description: Total number of views across all videos
 *                 totalLikes:
 *                   type: number
 *                   description: Total number of likes across all videos
 *                 totalComments:
 *                   type: number
 *                   description: Total number of comments across all videos
 *       401:
 *         description: Unauthorized
 */
router.route("/stats").get(getChannelStats);

/**
 * @swagger
 * /api/v1/dashboard/videos:
 *   get:
 *     summary: Get all videos for the channel
 *     tags: [Dashboard]
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
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [views, likes, comments, createdAt]
 *           default: createdAt
 *         description: Field to sort videos by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: List of channel videos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 videos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *                 totalVideos:
 *                   type: number
 *                 page:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
router.route("/videos").get(getChannelVideos);

export default router;
