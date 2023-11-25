const express = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const { newOrder, myOrders, getSingleOrder } = require("../controllers/orderController");



router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);





module.exports = router;