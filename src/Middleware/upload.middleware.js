import multer from "multer"

const storage   = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./Uploads')
    },
    filename:(req,file,cb)=>{
        const uniqueName = Date.now()
        cb(null,uniqueName +"-"+file.originalname);
    }
})

const uploads = multer({
    storage:storage
})

export default uploads;

