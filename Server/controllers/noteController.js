
const createNotes=async(req,res)=>{
    try {
        const {title,category,content,author}=req.body;

        const notes=await prisma.create({
            data:{
                title,
                category,
                content,
                author
            }
        })
        res.status(201).json(notes)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

