const prisma=require("./prisma")

const connectDB=async(req,res)=>{
    try {
        await prisma.$connect();
        console.log("Database connected successfully!!")
    } catch (error) {
        console.log("Database not connected!!",error)
        process.exit(1);
    }
}

module.exports=connectDB;