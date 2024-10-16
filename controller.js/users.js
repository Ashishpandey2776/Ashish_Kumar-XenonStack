const User=require("../models/user.js");
const Booking=require("../models/Booking_details");
module.exports.signup=async(req,res)=>{
    try{
     let {username,email,password}=req.body;
     const newuser= new User({email,username});
     const registerUser=await User.register(newuser,password);
      registerUser.user_id=registerUser.id;
      registerUser.save(); 
     console.log(registerUser);
     req.login(registerUser,(err)=>{
         if(err){
             return next(err);
         }
         req.flash("success","Welcome to Wanderloust!");
        res.redirect("/listings");
     }) 
    } catch(e){
     req.flash("error",e.message);
     res.redirect("/signup");
    }
 };

 module.exports.login=async(req,res)=>{
    req.flash("success","welcome to Wanderlust");
    res.redirect("/listings");
};

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
};

//delete listing
module.exports.Booking_delete=async (req, res) => {
    const userId = req.params.userId;
    const bookingId = req.params.bookingId;
    const book=await Booking.findByIdAndDelete(bookingId)
    console.log(book);
    req.flash("success","Cancelation Successfull!");
    res.redirect("/listings");
  }