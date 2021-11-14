const express = require("express");

const { addTodo, getAllTodos } = require("../controllers/todoControllers");

const { protect } = require("../middlewares/protectedRoutes");

const router = express.Router();

// Post user auth
router.route("/addTodo").post(protect, addTodo);

// User gets his/her own details
router.route("/getAllTodos").get(protect, getAllTodos);

module.exports = router;
