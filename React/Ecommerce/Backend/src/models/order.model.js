import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },

            title:String,

            image:String,

            price:Number,

            quantity:Number,

            subtotal:Number
        }
    ],

    shippingAddress:{
        name:String,
        phone: String,
        address:String,
        city:String,
        state:String,
        zip:String
    },

    subtotal:Number,

    discount:Number,

    tax:Number,

    shipping:Number,

    total:Number,

    paymentMethod:{
        type:String,
        enum:["COD","Razorpay","Stripe"],
        default:"COD"
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed","Refunded"],
        default:"Pending"
    },

    orderStatus:{
        type:String,
        enum:[
            "Placed",
            "Confirmed",
            "Packed",
            "Shipped",
            "Out For Delivery",
            "Delivered",
            "Cancelled"
        ],
        default:"Placed"
    }

},
{
    timestamps:true
});

export default mongoose.model("Order",orderSchema);