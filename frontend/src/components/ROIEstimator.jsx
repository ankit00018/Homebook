import React, { useState } from "react";

const ROIEstimator = () => {
  const [values, setValues] = useState({
    income: "",
    expenses: "",
    investment: ""
  });

  const [roi, setRoi] = useState(null);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formatToINR = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const calculateROI = () => {
    const { income, expenses, investment } = values;
    const netIncome = parseFloat(income) - parseFloat(expenses);
    const roiCalc = (netIncome / parseFloat(investment)) * 100;

    setRoi(!isNaN(roiCalc) ? roiCalc.toFixed(1) : "Invalid");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Annual Rental Income (₹)</label>
        <input
          type="number"
          name="income"
          value={values.income}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Annual Expenses (₹)</label>
        <input
          type="number"
          name="expenses"
          value={values.expenses}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Total Investment (₹)</label>
        <input
          type="number"
          name="investment"
          value={values.investment}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        onClick={calculateROI}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Calculate ROI
      </button>

      {roi && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
          <p className="text-center text-green-700 font-semibold">
            Estimated ROI: <span className="text-2xl">{roi}%</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ROIEstimator;
