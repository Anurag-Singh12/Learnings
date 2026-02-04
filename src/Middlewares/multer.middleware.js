import multer from "multer";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {           //req coming from user , file from multer, cb means callback ftn
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {  
      cb(null, file.originalname)
    }
    
  })
  
export const upload = multer({   //not default export so, we have to import by using{} and same name as export
    storage, 
})