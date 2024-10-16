const Booking=require("../models/Booking_details.js");
const nodemailer = require("nodemailer");
const {islogedIn,isowner,mailsender}=require("../middleware.js")
const Listing=require("../models/listing.js");
const Booking_details=require("../models/Booking_details.js");
const User=require("../models/user.js");

 module.exports.BookNow=async (req, res) => {
    try {
        const { username, startDate, endDate } = req.body;
        const { id } = req.params; //  listingId is passed as a URL parameter
        const currUser=req.query
        const newBooking = new Booking({
            user: currUser.id,
            listingId: id,
            name: username,
            startDate,
            endDate
        });
        console.log(newBooking);
        //for sms service
        const user_details=await User.findById(newBooking.user);
        const listing_details = await Listing.findById(newBooking.listingId);
       // console.log(user_details,listing_details)

        await newBooking.save();
        req.flash("success","Booking successful!");
        mailsender(user_details,listing_details,newBooking)
        res.redirect("/listings");
        res.status(201).send({ message: 'Booking successful', data: newBooking });
    } catch (error) {
        console.error(error);
        req.flash("error","Booking faild!");
        res.status(500).send({ message: 'Error saving booking', error });
    }
};

