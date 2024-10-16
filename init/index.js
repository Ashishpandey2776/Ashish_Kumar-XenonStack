 const mongoose=require("mongoose");
 const initData=require("./data.js");
 const Listing=require("../models/listing.js");
 const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient=mbxGeocoding({accessToken:process.env.MAP_TOKEN});

 main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(process.env.DATABASE_URL);
}

const initdb=async()=>{
    await Listing.deleteMany({});
   // await Listing.insertMany(initData.data);
   for(newData of initData.data){
    let response=await geocodingClient.forwardGeocode({
        query:newData.location,
        limit:1,
      }).send()
    const newListing = new Listing({
        title: newData.title,
        description: newData.description,
        image: newData.image, // Storing only the URL
        price: newData.price,
        location: newData.location,
        country: newData.country,
        owner: newData.owner,
        geometry:response.body.features[0].geometry,
    });
    
    newListing.save()
        .then(savedListing => {
            console.log("Listing saved:", savedListing);
        })
        .catch(error => {
            console.error("Error saving listing:", error);
        });
   }
    console.log("data Enter");
};

initdb();