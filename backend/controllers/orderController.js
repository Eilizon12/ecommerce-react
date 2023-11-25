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
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{

    const order = await Order.find(req.params.id);

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHander("You have already delivered this product",400));
    }


    order.orderItems
  

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
});