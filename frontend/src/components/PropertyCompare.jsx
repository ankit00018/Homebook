import React, { useState } from "react";

const PropertyInput = ({ property, onChange, title }) => (
  <div className="space-y-3">
    <h3 className="font-medium text-gray-700">{title}</h3>
    <input
      type="text"
      placeholder="Property name"
      value={property.name}
      onChange={(e) => onChange('name', e.target.value)}
      className="w-full p-2 rounded-lg border border-gray-200"
    />
    <div className="grid grid-cols-2 gap-3">
      <input
        type="number"
        placeholder="Price (₹)"
        value={property.price}
        onChange={(e) => onChange('price', e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-200"
      />
      <input
        type="number"
        placeholder="Area (sqft)"
        value={property.area}
        onChange={(e) => onChange('area', e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-200"
      />
    </div>
  </div>
);

const PropertyCompare = () => {
  const [properties, setProperties] = useState([
    { name: "", price: "", area: "" },
    { name: "", price: "", area: "" }
  ]);

  const handlePropertyChange = (index, field, value) => {
    const newProperties = [...properties];
    newProperties[index][field] = value;
    setProperties(newProperties);
  };

  const calculatePricePerSqft = (price, area) => {
    if (!price || !area) return 0;
    return (parseFloat(price) / parseFloat(area)).toFixed(2);
  };

  const formatINR = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const [price1, price2] = properties.map(p => 
    calculatePricePerSqft(p.price, p.area)
  );

  return (
    <div className="space-y-6">
      <div className="space-y-6 p-4 bg-gray-50 rounded-xl">
        {properties.map((property, index) => (
          <div key={index} className="space-y-4">
            <PropertyInput
              property={property}
              onChange={(field, value) => handlePropertyChange(index, field, value)}
              title={`Property ${index + 1}`}
            />
            {index === 0 && <hr className="border-t border-gray-200" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        {properties.map((property, index) => {
          const rate = calculatePricePerSqft(property.price, property.area);
          return (
            <div key={index} className="p-4 bg-white rounded-xl border border-gray-200">
              <p className="font-medium text-gray-600 mb-2">
                {property.name || `Property ${index + 1}`}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{rate}
                <span className="text-sm font-normal text-gray-500 ml-1">/sqft</span>
              </p>
            </div>
          );
        })}
      </div>

      {price1 && price2 && (
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="font-medium text-green-700">
            {price1 === price2 ? "Same price per sqft" : 
             `Better value: Property ${price1 < price2 ? 1 : 2}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyCompare;
