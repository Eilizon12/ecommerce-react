const Order = require("../models/orderModel")
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");




//Create new Order
exports.newOrder = catchAsyncError(async(req,res,next)=>{

const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
} = req.body;

const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
});

res.status(200).json({
    success:true,
    order,
});

});

//get Single Order
exports.getSingleOrder = catchAsyncError(async (req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHander("Order not found",404));
    }

    res.status(200).json({
        success:true,
        order,
    });
});

//get Log-in User Order
exports.myOrders = catchAsyncError(async(req,res,next)=>{

    const orders = await Order.find({user:req.user._id});

  

    res.status(200).json({
        success:true,
        orders,
    });
});

//get All Order - Admin
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount += order.totalPrice;
    })

  

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
});

// Update order - admin
exports.getUpdateOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.findById(req.params.id);


    if (!orders) {
        return next(new ErrorHander("Order not Found", 404));
    }

    if(orders.orderStatus === "Delivered"){
        return next(new ErrorHander("You have already delivered this product",400));
    }


  orders.orderItems.forEach(async(o)=>{
    await updateStock(o.Product,o.quantity);
  });

  orders.orderStatus = req.body.status;


  if(req.body.status === "Delivered"){
  orders.deliveredAt = Date.now();

  }
  
  await orders.save({validateBeforeSave:false});


    res.status(200).json({
        success:true,
    });
   
});

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save ({ validateBeforeSave:false });
}

// Delete Orders -- Admin
exports.getDeleteOrders = catchAsyncError(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHander("Order not Found", 404));
        }

        // Calculate total amount based on order details
        const totalAmount = calculateTotalAmount(order); // Replace this with your logic to calculate total amount

        await order.remove();

        res.status(200).json({
            success: true,
            totalAmount,
            message: "Order deleted successfully",
        });
    } catch (error) {
        return next(new ErrorHander("Error deleting order", 500));
    }
});
