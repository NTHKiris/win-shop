import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI
if (!uri){
    throw new Error('Missing MONGODB_URI environment variable');
}

async function connectDB(){
    try {
        await mongoose.connect(uri)
        console.log('Connect mongodb successfully!')
    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
    }
}
 
export default connectDB