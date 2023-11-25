const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");



//Get All The Product
exports.getAllProduct = catchAsyncError(async(req,res)=> {


  const resultPerPage = 5;  
  // const productCount = await Product.countDocument();

 const apiFeatures = new ApiFeatures(Product.find(),req.query)
 .search()
 .filter()
 .pagination(resultPerPage);
    const product = await apiFeatures.query;
    res.status(200).json({
      success:true,
      product
    });
});
//Get Product Details
exports.getProductDetails = catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
      return next(new ErrorHander("Product Not Found",404));
    }

    res.status(200).json({
      success:true,
      product,
    });
 
});
// Create Product - Admin
exports.createProduct = catchAsyncError(async(req,res,next)=>
{

  req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});
//Update Product - Admin
exports.updateProduct = catchAsyncError(async(req,res,next)=>{

        let product = await Product.findById(req.params.id);

        if(!product){
          return next(new ErrorHander("Product Not Found",404));
        }
    

        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            useFindAndModify:false
        });

        res.status(200).json({
            success:true,
            product
        })

});
//Delete Product - Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id; // Extract the product ID from the request parameters
  
      // Find the product by ID and delete it
      const product = await Product.findOneAndDelete({ _id: productId });
  
      if(!product){
        return next(new ErrorHander("Product Not Found",404));
      }

  
      res.status(200).json({
        success: true,
        message: "Product has been deleted"
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
});


//Create Review or Update Review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }

  // Recalculate average ratings
  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });

  product.numOfReviews = product.reviews.length;

  // Calculate the average rating based on the totalRating and numOfReviews
  product.ratings = totalRating / product.numOfReviews;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Successfully Add Rating and Comment',
  });
});


//Get All Reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {

  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHander("Product not Found",400))
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews,
  });
});

// Delete Reviews
exports.deleteAllReviews = catchAsyncError(async (req, res, next) => {
  const productId = req.query.productId;

  // Find the product by its ID
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHander('Product not found!', 404));
  }

  // Remove all reviews associated with the product
  product.reviews = [];

  // Reset ratings and number of reviews to 0
  product.ratings = 0;
  product.numOfReviews = 0;

  // Save the updated product without reviews
  await product.save();

  res.status(200).json({
    success: true,
    message: 'All reviews for the product have been successfully deleted.',
  });
});


