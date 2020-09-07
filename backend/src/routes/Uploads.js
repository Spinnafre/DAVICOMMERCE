import express from "express";
import multer from "multer";


import storageConfig from '../config/config'

const upload = multer(storageConfig)



const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  res.send({image_URL:"http://localhost:2500/uploads/"+req.file.filename});
});



export default router;
