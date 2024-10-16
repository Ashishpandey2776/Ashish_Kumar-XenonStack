const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
const Listing=require("../models/listing.js");
const Booking=require("../models/Booking_details.js");
const User=require("../models/user.js");
const router=express.Router();
const passport = require("passport");
const UserConroller=require("../controller.js/users.js");
const {islogedIn,isowner}=require("../middleware.js")

//signup
router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(UserConroller.signup));

//login
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),UserConroller.login);

//for logout
router.get("/logout",UserConroller.logout);

//my booking for show booking
router.get("/mybooking/:id",islogedIn,async(req,res)=>{
    let {id}=req.params;
    const book_details = await Booking.find({ user: id });
    const user_details=await User.findById(id);
    const listing_details=[]
    for (let booking of book_details) {
        const listing = await Listing.findById(booking.listingId);
        listing_details.push(listing);
    }
    res.render("users/showbooking.ejs",{book_details,listing_details,user_details});
})

router.delete('/mybooking/:userId/:bookingId',islogedIn,UserConroller.Booking_delete );


module.exports=router;