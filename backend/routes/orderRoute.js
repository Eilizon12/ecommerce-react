const express = require("express");
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const { newOrder, myOrders, getSingleOrder, getAllOrders, getUpdateOrders, getDeleteOrders } = require("../controllers/orderController");



router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"),getAllOrders);

router.route("/admin/orders/:id").put(isAuthenticatedUser, authorizeRoles("admin"),getUpdateOrders).delete(isAuthenticatedUser, authorizeRoles("admin"),getDeleteOrders);






module.exports = router;