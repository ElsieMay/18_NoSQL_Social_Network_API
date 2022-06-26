const router = require("express").Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/courses/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/courses/:thoughtId/reactions
// router.route("/api/thoughts/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions").post(addReaction);

// /api/courses/:thoughtId/reactions/:reactionId
// router.route("/api/thoughts/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
