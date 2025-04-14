import { Video, FileText, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfessionalCorner = () => {

  const navigate = useNavigate()

  const handleNavigation = (resourceTitle) => {
    if(resourceTitle === "Contract Templates") {
      navigate('/templates');
    }
    if(resourceTitle === "Regulatory Updates") {
      navigate('/regulatory-updates');
    }
  }; // Closing the function properly

  
  const resources = [
    {
      icon: <Video className="w-4 h-4" />,
      title: "Market Webinars",
      subtitle: "Next: Thu 3PM EST",
      tag: "Live",
    },
    {
      icon: <FileText className="w-4 h-4" />,
      title: "Contract Templates",
      subtitle: "12+ Formats Available",
      tag: "Download",
    },
    {
      icon: <AlertCircle className="w-4 h-4" />,
      title: "Regulatory Updates",
      subtitle: "New Zoning Laws",
      tag: "Alert",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-600" />
        Professional Corner
      </h2>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li
            key={index}
            onClick={() => handleNavigation(resource.title)}
            className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                {resource.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-800">
                  {resource.title}
                </h4>
                <p className="text-xs text-gray-500">{resource.subtitle}</p>
              </div>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {resource.tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessionalCorner;
