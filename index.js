const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const Registerdata=require("./Models/Register")
const bookingdata=require("./Models/Booking")
const profiledata=require("./Models/profilemodel")
const checkin=require("./Models/checkin")
const roomdata = require("./Models/rooms")
const app=express();
const url='mongodb+srv://Sajahan-1:Sajahan123@sajahan-cluster.g6e3xnk.mongodb.net/Hotel?retryWrites=true&w=majority&appName=SAJAHAN-CLUSTER';
port=5000;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(function (req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-with, Content-Type,Accept,Authorization'
    );
    next();
});
app.use(express.json())

mongoose.connect(url)
        .then((x)=>{console.log(`Connected Successfully! to ${x.connections[0].name} DB`)})
        .catch((err)=>{console.error(`connection Problem: ${err}`)});



app.post("/Register",(req,res)=>{

    Registerdata.create(req.body)
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
    
})

app.post("/Login",(req,res)=>{

    Registerdata.findOne({email:req.body.email})
    .then((user)=>{
         
        if(user){
            if(user.password === req.body.password){
                
                res.json(user)
            }else{
                res.json("Password Incorrect")
            }
        }else{
            
            res.json("E-mail not registered")
        }
    })
    .catch(err=>{
        console.log(err)
        res.json(err)})
})


app.post("/booking",(req,res)=>{
    
    bookingdata.create(req.body)
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
    
})

app.post('/bookingdetails',(req,res)=>{

    bookingdata.find({userid:req.body.user_id})
      .then((result)=>{res.json(result);})
      .catch((err)=>console.log(err))

})

app.get('/admin/bookingdetails',(req,res)=>{

    bookingdata.find()
      .then((result)=>{res.json(result);})
      .catch((err)=>console.log(err))

})

app.post('/uploads',(req,res)=>{
    
    profiledata.find({userprofileid:req.body.userprofileid})
    .then((data)=>{
        
        if(data.length===0){
            profiledata.create(req.body)
            .then((sdata)=>res.json(sdata))
        }else{
            profiledata.findOneAndReplace({userprofileid:req.body.userprofileid},{userprofileid:req.body.userprofileid ,myFile:req.body.myFile})
            .then((result)=>{
                res.json(result);
               console.log("updated")
            })
            .catch(err=>res.json(err))
        }

    })
    .catch(err=>res.json(err))
})

app.post('/uploads/profile',(req,res)=>{
    profiledata.find({userprofileid:req.body.userprofileid})
    .then((sdata)=>res.json(sdata))
    .catch(err=>res.json(err))
})

app.post('/checkin',(req,res)=>{
   
    checkin.create(req.body)
   .then((sdata)=>{
     bookingdata.findByIdAndUpdate(req.body.book_id,{cstatus:'Checkin',cindat:new Date()})
    .then(outdata=>console.log('successfully updated checkin'))
    .catch(err=>console.log(err))
    res.json(sdata)
   })
   .catch(err=>res.json(err))

   
})

app.post('/checkout',(req,res)=>{
    
    checkin.deleteOne({bkid:req.body.coutid})
   .then((sdata)=>{
     bookingdata.findOneAndUpdate({book_id:req.body.coutid},{cstatus:'Checkout',coutdate:new Date()})
    .then(outdata=>console.log('checked out'))
    .catch(err=>console.log(err))
    res.json(sdata)
   })
   .catch(err=>res.json(err))

   
})

app.get('/checkindata',(req,res)=>{
     checkin.find()
    .then((sdata)=>res.json(sdata))
    .catch(err=>res.json(err))
 })

 app.post('/roomdatas',(req,res)=>{

    roomdata.findOneAndUpdate({roomtype:req.body.roomtype},{cost:req.body.cost,inclusion:req.body.inclusion,myFile:req.body.myFile})
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
    
})

app.get('/roomavailable',(req,res)=>{
    checkin.find()
   .then((sdata)=>res.json(sdata))
   .catch(err=>res.json(err))
})

app.get('/roomdatas',(req,res)=>{
    roomdata.find()
   .then((sdata)=>res.json(sdata))
   .catch(err=>res.json(err))
})


app.listen(port,()=>{console.log(`listening Port http://localhost:${port}`)})

