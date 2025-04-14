import multer from "multer";
const upload = multer({
  storage:multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

export const uploadSingle = upload.single("image");
export const uploadMultiple = upload.array("images", 10);

export default upload;
