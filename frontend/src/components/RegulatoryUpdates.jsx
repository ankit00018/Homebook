// RegulatoryUpdates.jsx
import { AlertCircle, FileText, Megaphone } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { saveAs } from 'file-saver';

const RegulatoryUpdates = () => {
  // Sample regulatory data for Indian real estate
  const regulatoryUpdates = [
    {
      id: 1,
      title: "New Zoning Laws in Maharashtra",
      date: "2024-03-15",
      description: "Revised FSI regulations for Mumbai metropolitan region",
      category: "Zoning",
      alertLevel: "Critical"
    },
    {
      id: 2,
      title: "GST Updates for Real Estate",
      date: "2024-03-10",
      description: "Revised GST rates for affordable housing projects",
      category: "Taxation",
      alertLevel: "Warning"
    },
    {
      id: 3,
      title: "RERA Compliance Updates",
      date: "2024-03-01",
      description: "New quarterly reporting requirements for builders",
      category: "Compliance",
      alertLevel: "Info"
    }
  ];

  const handleDownload = (update) => {
    const content = `${update.title}\nDate: ${update.date}\nCategory: ${update.category}\n\n${update.description}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `regulation_${update.id}.txt`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Megaphone className="w-8 h-8 text-red-600" />
        <h1 className="text-3xl font-bold text-gray-800">Regulatory Updates</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Latest Indian Real Estate Regulations</h2>
        </div>

        <div className="space-y-4">
          {regulatoryUpdates.map((update) => (
            <div key={update.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      update.alertLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                      update.alertLevel === 'Warning' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {update.alertLevel}
                    </span>
                    <span className="text-sm text-gray-500">{update.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{update.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{update.description}</p>
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {update.category}
                  </span>
                </div>
                <button
                  onClick={() => handleDownload(update)}
                  className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegulatoryUpdates