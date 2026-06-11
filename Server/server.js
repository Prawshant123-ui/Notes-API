require("dotenv").config()
const connectDB=require("./config/db")
const app=require("./app")

const PORT = process.env.PORT || 4000;
const startServer=async(req,res)=>{
    try {
        await connectDB()
        app.listen(PORT,()=>{
            console.log(`Server starts on : http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Server cannot start",error)
        process.exit(1);
    }
}

startServer()