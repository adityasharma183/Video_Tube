import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/subscriptions/c/{channelId}:
 *   post:
 *     summary: Toggle subscription to a channel
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the channel to subscribe/unsubscribe
 *     responses:
 *       200:
 *         description: Subscription status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscribed:
 *                   type: boolean
 *                   description: Whether the user is now subscribed to the channel
 *       400:
 *         description: Invalid channel ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Channel not found
 */
router.route("/c/:channelId").post(toggleSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/u/{subscriberId}:
 *   get:
 *     summary: Get channels subscribed by a user
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subscriberId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the subscriber
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
 *         description: List of subscribed channels retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscribedChannels:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 totalSubscriptions:
 *                   type: number
 *                 page:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Subscriber not found
 */
router.route("/u/:subscriberId").get(getSubscribedChannels);

/**
 * @swagger
 * /api/v1/subscriptions/c/{channelId}/subscribers:
 *   get:
 *     summary: Get subscribers of a channel
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: channelId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the channel
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
 *         description: List of subscribers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscribers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 totalSubscribers:
 *                   type: number
 *                 page:
 *                   type: number
 *                 totalPages:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Channel not found
 */
router.route("/c/:channelId/subscribers").get(getUserChannelSubscribers);

export default router;
