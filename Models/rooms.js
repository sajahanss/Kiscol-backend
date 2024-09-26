const mongoose=require("mongoose")

const roomsschema=new mongoose.Schema({
    roomtype: String,
    cost: String,
    inclusion: String,
    myFile: String,
});

const roomdata=mongoose.model("rooms",roomsschema);

module.exports=roomdata;