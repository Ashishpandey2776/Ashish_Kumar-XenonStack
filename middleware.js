const Listing = require("./models/listing");
const nodemailer = require("nodemailer");



//gmail notification  
// async function main(user_details,listing_details,newBooking) {
//     try {
//         const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com', //(smtp simple mail tranfer protocall provide by google for gmail)
//         port: 587, // TLS port(transport layer security is a cryptographic protocol for secure messege on network)
//         secure: false, 
//         auth: {
//             user: 'ashishtest071@gmail.com',
//             pass: 'lxthrxndflhytvku', 
//         },
//         logger: true, 
//         debug: true,
//         });
//        console.log(user_details,listing_details,newBooking);
//         const info = await transporter.sendMail({
//         from: 'ashishtest071@gmail.com',
//         to: `${user_details.email}`, 
//         subject: 'Congurationals Booking successfull', 
//         html: `<p><b>Booking Details</b> <br> <br>
//                 title: ${listing_details.title}<br>
//                 location: ${listing_details.location},${listing_details.country}<br>
//                 price: ${listing_details.price}<br>
//                 guestName: ${newBooking.name}<br>
//                 bookingBy: ${user_details.username}<br>
//                 startDate: '2024-06-30' <br>
//                 endDate: '2024-06-30'   <br>
//                 Contact: ${user_details.email}<br>
//               </p>`,
//         });
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     } catch (error) {
//         console.error('Error occurred: ', error.message);
//         console.error('Full error: ', error);
//     }
//     }
// module.exports.mailsender=(user_details,listing_details,newBooking)=>{
//     return main(user_details,listing_details,newBooking).catch(console.error);
// }

module.exports.islogedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must login first");
        return res.redirect("/login")
     }
     next();
};

module.exports.isowner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","Permission Required to owner");
        return res.redirect(`/listings/${id}`);
    }
    next();
};



