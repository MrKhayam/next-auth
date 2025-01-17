import mongoose from "mongoose";


const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://khayam:anamkhayam@auth.tjzu0l0.mongodb.net/"
    );
    console.log(`Database Connected Successfully at host: ${mongoose.connection.host}`);
}

export default connectDB;