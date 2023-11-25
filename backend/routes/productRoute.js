const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");


const router =  express.Router();


router.route("/products").get(getAllProduct);
router.route("/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct).get(isAuthenticatedUser, authorizeRoles("admin"), getProductDetails);

module.exports = router