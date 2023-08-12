import mongoose from "mongoose";

let isconnected=false
export const connectToDB=async()=>{
    mongoose.set('strictQuery',true)

    if(isconnected){
        console.log("Mongodb is alewady connected")
        return;
       }
try{

 await mongoose.connect(process.env.MONGO_URL,{
    dbName:"share_prompt",
    useNewUrlParser:true,
    useUnifiedTopology:true
 })

 isconnected=true

 console.log("mongodb conneced")
}catch(error){
 console.log(error)
}

}