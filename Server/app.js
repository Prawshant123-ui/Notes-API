const express=require('express')
const cors=require('cors')
const authRoute=require("./routes/authRoutes")
const noteRoute=require("./routes/noteRoutes")

const app=express()

app.use(express.json())
app.use(cors(
    {
        origin : 'http://localhost:8080'
    }
))


app.get('/',(req,res)=>{
    res.send("API is working!!")
})

app.use('/api/auth',authRoute)
app.use('/api',noteRoute)

module.exports=app

