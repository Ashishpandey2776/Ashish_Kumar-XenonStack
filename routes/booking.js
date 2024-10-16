const express=require("express");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const {islogedIn,isowner}=require("../middleware.js")
const BookingConroller=require("../controller.js/Booking.js")


//for booking
router.get("/:id/bookings",islogedIn,(req,res)=>{
    const reqid=req.params.id;
    console.log(reqid);
    res.render("booking/bookings.ejs",{reqid});
});

router.post("/:id/bookings",islogedIn,wrapAsync(BookingConroller.BookNow));


module.exports=router;