const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, createReview, getAllReviews, deleteReview, deleteAllReviews } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");


const router =  express.Router();


router.route("/products").get(getAllProduct);

router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct).get(isAuthenticatedUser, authorizeRoles("admin"), getProductDetails);


router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createReview)
router.route("/reviews").get(getAllReviews).delete(isAuthenticatedUser,deleteAllReviews)

module.exports = router;