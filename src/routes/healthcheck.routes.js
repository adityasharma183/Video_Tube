import { Router } from "express";

import { healthcheck } from "../controllers/healthcheck.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/healthcheck:
 *   get:
 *     summary: Check API health status
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 message:
 *                   type: string
 *                   example: "API is healthy"
 */
router.route("/").get(healthcheck);

export default router;
