import multer from "multer";
const upload = multer({
  storage:multer.memoryStorage(),
});

// Middleware to handle both single & multiple file uploads
const uploadMiddleware = {
  single: upload.single("image"), // For single file upload
  multiple: upload.array("images", 10), // For multiple file uploads (up to 10)
};

export const uploadSingle = upload.single("image"); // ✅ Export individual handlers
export const uploadMultiple = upload.array("images", 10);
export default upload;
