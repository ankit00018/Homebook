import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";

// backend/controllers/post.controller.js → backend/controllers/property.controller.js
import { Property } from "../models/property.model.js";

// Create Property
const createProperty = async (req, res) => {
  const { title, price, location, bedrooms, bathrooms, area, description } =
    req.body;

  // Ensure images are uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "Upload at least one image" });
  }

  // const images = req.files.map(file => file.path);

  let imageUrls = [];

  // Process each image
  for (const file of req.files) {
    try {
      // Check if file buffer exists
      if (!file.buffer) {
        throw new Error("File buffer not found");
      }
      // Optimize image using Sharp
      const optimizedImageBuffer = await sharp(file.buffer)
        .resize({ width: 1000, height: 1000, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();

      // Convert to Base64 Data URI
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;

      // Upload to Cloudinary
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      imageUrls.push(cloudResponse.secure_url);
    } catch (error) {
      console.log(error);
    }
  }

  const property = await Property.create({
    user: req.id,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    description,
    images: imageUrls,
  });

  res.status(201).json({
    success: true,
    property,
    message: "Property Added",
  });
};

// Get All Properties
const getProperties = async (req, res) => {
  const properties = await Property.find().populate("user", "name email");
  res.status(200).json(properties);
};


const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check ownership
    if (property.user.toString() !== req.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete images from Cloudinary
    for (const imageUrl of property.images) {
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      success: true, 
      message: "Property deleted successfully" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { createProperty, getProperties, deleteProperty };
