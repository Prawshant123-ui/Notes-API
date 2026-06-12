const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");
const validate = require("../middlewares/validateMiddleware");

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

module.exports = router;