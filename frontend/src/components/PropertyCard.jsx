import { ChevronLeft, ChevronRight, MessageSquareText } from "lucide-react";
import React, { useState } from "react";
import { FaBed, FaBath, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// PropertyCard.jsx
const PropertyCard = ({ property }) => {
  const [liked, setLiked] = useState(false);
  const { title, price, location, bedrooms, bathrooms, images, area } =
    property;

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition-all bg-white w-full"> 
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={images.length > 1}
          dynamicHeight={false}
          renderArrowPrev={(onClick) => (
            <button
              onClick={onClick}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow-sm z-10 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          renderArrowNext={(onClick) => (
            <button
              onClick={onClick}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow-sm z-10 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        >
          {images.map((img, index) => (
            <div key={index} className="h-full w-full">
              <img
                src={img}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </Carousel>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          <div className="bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium">
            {bedrooms} BHK
          </div>
          <div className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            New
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm ${
            liked ? "text-red-500 bg-white/90" : "text-gray-300 bg-white/80"
          }`}
        >
          <FaHeart className="w-5 h-5" />
        </button>
      </div>

      {/* Details Section */}
      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h3>
          <span className="text-sm text-gray-500">{area} sqft</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <FaMapMarkerAlt className="flex-shrink-0 text-gray-500" />
          <span className="truncate">{location}</span>
        </div>

        {/* Price Section */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-blue-600">
            ₹{price?.toLocaleString("en-IN")}
          </span>
          <span className="text-sm text-gray-500">onwards</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaBed className="text-gray-500" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-500" />
            <span>{bathrooms}</span>
          </div>
        </div>

        {/* Contact Button */}
        <button className="mt-3 w-full bg-[linear-gradient(to_top,#D037A2_0%,#9142CA_50%,#2E42BF_100%)] hover:bg-[linear-gradient(to_top,#D037A2_0%,#9142CA_50%,#2E42BF_100%)] text-white py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:brightness-110">
          <MessageSquareText className="w-4 h-4" />
          Contact Agent
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;