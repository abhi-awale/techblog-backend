const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: test api 
 *     description: this is testing url to check swagger documentation working
 *     responses:
 *       200:
 *         description: list of test user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: test123654
 *                   name:
 *                     type: string
 *                     example: test_user
 */
router.get("/", async (req, res) => {
  res.json([{ _id: "1test123654", name: "test_user" }]);
});

module.exports = router;