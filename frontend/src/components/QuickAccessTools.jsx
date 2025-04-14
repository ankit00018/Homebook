// QuickAccessTools.js
import React, { useState } from "react";
import MortgageCalculator from "./MortgageCalculator";
import ROIEstimator from "./ROIEstimator";
import PropertyCompare from "./PropertyCompare";


const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const QuickAccessTools = () => {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { id: "mortgage", icon: "🏠", label: "Mortgage Calculator" },
    { id: "roi", icon: "📊", label: "ROI Estimator" },
    { id: "compare", icon: "⚖️", label: "Property Compare" },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-blue-600">⚡</span>
        Quick Access Tools
      </h2>
      <ul className="space-y-2">
        {tools.map((tool) => (
          <li
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/50 cursor-pointer transition-colors border border-transparent hover:border-blue-100"
          >
            <span className="text-2xl">{tool.icon}</span>
            <span className="text-gray-700 font-medium">{tool.label}</span>
          </li>
        ))}
      </ul>

      <Modal
        title={tools.find(t => t.id === activeTool)?.label || "Tool"}
        isOpen={!!activeTool}
        onClose={() => setActiveTool(null)}
      >
        {activeTool === "mortgage" && <MortgageCalculator />}
        {activeTool === "roi" && <ROIEstimator />}
        {activeTool === "compare" && <PropertyCompare />}
      </Modal>
    </div>
  );
};

export default QuickAccessTools;