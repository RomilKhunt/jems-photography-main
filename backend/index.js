const express = require('express');
const mongoose = require('mongoose')
const app = express();
const port =  7000;
const env = require("dotenv");
env.config();
const mainSlider = require('./mainSlider');
const portraitSlider = require('./portraitslider');
const sections = require('./section');
const code = "jems@jkotiajrekjak752ukajk";
const path = require("path");
const cors = require('cors');

app.use(
    cors({
      origin: "*",
    })
  );
app.use(express.json());
async function mid(req,res,next){
    const {token}=req.headers;
    if(token==code){
        try {
            next();
          } catch (err) {
            console.log(err);
            res.send({status:'unOthorized request...'});
          }
    }else{
        res.json({status:'unothorized Request'});
    }
}

const mongourl = process.env.Database;
mongoose.connect(mongourl,{}).then(()=>{
    console.log("connected mongourl successfully");
}).catch((err)=>{console.log(err)})

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// app.get("/", (req, res) => {
//   res.header('Access-Control-Allow-Origin', '*'); 
//   res.json({status:'welcome to jems studio'})
// });

app.use(mid);

// MAIN SLIDER
app.get("/mainsliderImages",async (req,res)=>{
    try {
        const dt = await mainSlider.find().sort("index");
        res.json({dt}); 
    } catch (error) {res.json({status:'error'});
    }
})
app.post("/mainsliderAddImage",async (req,res)=>{
    const {link,index} =req.body;
    const dt = await mainSlider.create({link,index});
    if(dt){
        res.json({status:'ok'})
    }else{
        res.json({status:"error"});
    }
})
app.delete('/mainslider/:id',async (req,res)=>{
    const {id}= req.params;
    const dt = await mainSlider.findByIdAndDelete(id);
    dt?res.json({status:'ok'}):res.json({status:'error',dt});
    console.log(dt);
})
app.get('/swapSliderMain/:id1/:id2',async (req,res)=>{
    const {id1,id2}=req.params;

    const Model = mainSlider;
    const doc1 = await Model.findById(id1);
    const doc2 = await Model.findById(id2);

    const temp = doc1["index"];
    doc1["index"] = doc2["index"];
    doc2["index"] = temp;

    await doc1.save();
    await doc2.save();

    res.json({status:'ok'});

})

// PORTRAIT SLIDER
app.get('/portraitSlider',async (req,res)=>{
    const dt = await portraitSlider.find().sort('index');
    dt?res.json({status:'ok',dt}):res.json({status:'error'});
})
app.post('/portraitSlider',async (req,res)=>{
    const {link,index} =req.body;
    const dt = await portraitSlider.create({link,index});
    if(dt){
        res.json({status:'ok'});
    }else{
        res.json({status:"error"});
    }
})
app.delete('/portraitslider/:id',async (req,res)=>{
    const {id}= req.params;
    const dt = await portraitSlider.findByIdAndDelete(id);
    dt?res.json({status:'ok'}):res.json({status:'error'});
})
app.get('/swapSliderPortrait/:id1/:id2',async (req,res)=>{
    const {id1,id2}=req.params;

    const Model = portraitSlider;
    const doc1 = await Model.findById(id1);
    const doc2 = await Model.findById(id2);

    const temp = doc1["index"];
    doc1["index"] = doc2["index"];
    doc2["index"] = temp;

    await doc1.save();
    await doc2.save();

    res.json({status:'ok'});

})

//SERVICE LIST
app.get('/services',async (req,res)=>{
    const dt = await sections.find();
    dt?res.json({status:'ok',dt}):res.json({status:'error'});
})
app.post('/services',async (req,res)=>{
    const {service}= req.body;
    const {serviceName,serviceDescription,poster,samplePhotos} = service;
    const dt = await sections.create({img:poster,title:serviceName,text:serviceDescription,imglist:samplePhotos});
    if(dt){
        res.json({status:'ok'});
    }else{
        res.json({status:"error"});
    }
})
app.delete('/services/:id',async (req,res)=>{
    const {id}= req.params;
    const dt = await sections.findByIdAndDelete(id);
    dt?res.json({status:'ok'}):res.json({status:'error'});
})
app.post('/updateService',async (req,res)=>{
    const {id,serviceName,serviceDescription,poster,samplePhotos}=req.body.service;
    const dt = await sections.findByIdAndUpdate(id,{$set: {title: serviceName,text: serviceDescription,img:poster,imglist: samplePhotos}});
    dt?res.json({status:'ok'}):res.json({status:'error'});
})



// IN SERVICE IMAGES 
app.post("/updateInnerService/:id",async (req,res)=>{
    const {id}=req.params;
    const {imglist}=req.body;
    const dt = await sections.findByIdAndUpdate(id,{$set:{imglist:imglist}})
    dt?res.json({status:'ok'}):res.json({status:'error'})
})

app.listen(port,()=>{
    console.log("listening on port: "+port);
})
