import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


if (!process.env.MONGODB_URI){
    throw new Error('Missing MONGODB_URI environment variable');
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connect mongodb successfully!')
    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
    }
}
 
export default connectDB