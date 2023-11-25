const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHander = require("../utils/errorHander");


// Create Product - Admin
exports.createProduct = async(req,res,next)=>
{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}
//Get All The Product
exports.getAllProduct = async(req, res)=> {


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
    })
}
//Get Product Details
exports.getProductDetails = async(req, res)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
      res.status(500).json({
        success:false,
        message:"Product not found"
      });
    }

    res.status(200).json({
      success:true,
      product,
    });


}
//Update Product - Admin
exports.updateProduct = async(req,res,next)=>{

        let product = await Product.findById(req.params.id);

        if(!product){
          return next(new ErrorHander("Product not found",404));
          
        }
    

        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            useFindAndModify:false
        });

        res.status(200).json({
            success:true,
            product
        })

}
//Delete Product - Admin
exports.deleteProduct = async (req, res, next) => {
    try {
      const productId = req.params.id; // Extract the product ID from the request parameters
  
      // Find the product by ID and delete it
      const product = await Product.findOneAndDelete({ _id: productId });
  
      if(!product){
      return next(new ErrorHander("Product not found",404));
      
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
};