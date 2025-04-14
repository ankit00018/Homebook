import React, { useState } from "react";

const MortgageCalculator = () => {
  const [values, setValues] = useState({
    principal: "",
    interest: "",
    years: ""
  });

  const [monthlyPayment, setMonthlyPayment] = useState(null);

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

  const calculateMortgage = () => {
    const { principal, interest, years } = values;
    const rate = parseFloat(interest) / 100 / 12;
    const payments = parseFloat(years) * 12;

    if (!principal || !interest || !years) {
      setMonthlyPayment("Please enter all fields.");
      return;
    }

    if (rate === 0) {
      const monthly = parseFloat(principal) / payments;
      setMonthlyPayment(formatToINR(monthly));
      return;
    }

    const x = Math.pow(1 + rate, payments);
    const monthly = (parseFloat(principal) * x * rate) / (x - 1);
    setMonthlyPayment(isFinite(monthly) ? formatToINR(monthly) : "Invalid input");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Loan Amount (₹)</label>
        <input
          type="number"
          name="principal"
          value={values.principal}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Interest Rate (%)</label>
        <input
          type="number"
          name="interest"
          step="0.01"
          value={values.interest}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Loan Term (years)</label>
        <input
          type="number"
          name="years"
          value={values.years}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        onClick={calculateMortgage}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Calculate Payment
      </button>

      {monthlyPayment && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-center text-blue-700 font-semibold">
            Estimated Monthly Payment: <span className="text-2xl">{monthlyPayment}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
