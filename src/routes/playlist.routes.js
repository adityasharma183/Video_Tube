import { Router } from "express";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

/**
 * @swagger
 * /api/v1/playlist:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       400:
 *         description: Invalid input
 */
router.route("/").post(createPlaylist);

/**
 * @swagger
 * /api/v1/playlist/{playlistId}:
 *   get:
 *     summary: Get playlist by ID
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist
 *     responses:
 *       200:
 *         description: Playlist details retrieved successfully
 *       404:
 *         description: Playlist not found
 *   patch:
 *     summary: Update playlist details
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *       404:
 *         description: Playlist not found
 *   delete:
 *     summary: Delete a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       404:
 *         description: Playlist not found
 */
router
  .route("/:playlistId")
  .get(getPlaylistById)
  .patch(updatePlaylist)
  .delete(deletePlaylist);

/**
 * @swagger
 * /api/v1/playlist/add/{videoId}/{playlistId}:
 *   patch:
 *     summary: Add a video to playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the video
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist
 *     responses:
 *       200:
 *         description: Video added to playlist successfully
 *       404:
 *         description: Video or playlist not found
 */
router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);

/**
 * @swagger
 * /api/v1/playlist/remove/{videoId}/{playlistId}:
 *   patch:
 *     summary: Remove a video from playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the video
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the playlist
 *     responses:
 *       200:
 *         description: Video removed from playlist successfully
 *       404:
 *         description: Video or playlist not found
 */
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

/**
 * @swagger
 * /api/v1/playlist/user/{userId}:
 *   get:
 *     summary: Get all playlists of a user
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of playlists retrieved successfully
 *       404:
 *         description: User not found
 */
router.route("/user/:userId").get(getUserPlaylists);

export default router;
