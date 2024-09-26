const mongoose=require("mongoose")

const checkinschema=new mongoose.Schema({
    bkid: String,
    broomtype: String,
    roomno:String,
    checkintime:String,
    guestname:String,
    book_id:String
});

const checkin=mongoose.model("Checkin",checkinschema);

module.exports=checkin;