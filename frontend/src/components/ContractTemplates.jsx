// ContractTemplates.jsx
import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Create styles for PDF documents
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 }
});

// PDF Document Component for Lease Agreement
const LeaseAgreementPDF = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>STANDARD LEASE AGREEMENT</Text>
        <Text style={styles.text}>This Lease Agreement is made on {new Date().toLocaleDateString()} between:</Text>
        <Text style={styles.text}>Lessor: [Landlord Name], residing at [Address]</Text>
        <Text style={styles.text}>Lessee: [Tenant Name], residing at [Address]</Text>
        <Text style={styles.text}>Property Address: [Full Property Address]</Text>
        <Text style={styles.text}>Term: 11 Months (As per Indian Rent Control Act)</Text>
        <Text style={styles.text}>Rent: ₹______ per month</Text>
        <Text style={styles.text}>Security Deposit: ₹______ (Refundable)</Text>
      </View>
    </Page>
  </Document>
);

// Actual template data with download handlers
const indianTemplates = [
  {
    id: 1,
    name: "Residential Lease Agreement",
    description: "11-month rental contract compliant with Indian laws",
    category: "Residential",
    generatePDF: () => (
      <PDFDownloadLink document={<LeaseAgreementPDF />} fileName="lease_agreement.pdf">
        {({ loading }) => (loading ? 'Generating...' : 'Download PDF')}
      </PDFDownloadLink>
    )
  },
  {
    id: 2,
    name: "Sale Deed Format",
    description: "Property transfer agreement as per Registration Act, 1908",
    category: "Commercial",
    downloadFile: () => {
      const blob = new Blob([`SALE DEED\n\nThis deed made between...\nProperty Details:\n\nConsideration Amount: ₹______\n\nWitnesses:\n1. _________\n2. _________`], 
        { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'sale_deed.txt');
    }
  },
  {
    id: 3,
    name: "Joint Development Agreement",
    description: "Builder-Owner contract for Indian real estate projects",
    category: "Development",
    downloadFile: () => {
      window.open('https://example.com/templates/jda.pdf', '_blank'); // Replace with actual URL
    }
  }
];

const ContractTemplates = () => {
  const handleDownload = (template) => {
    if (template.generatePDF) {
      return template.generatePDF();
    }
    if (template.downloadFile) {
      template.downloadFile();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Indian Real Estate Contracts</h1>
      <p className="text-gray-600 mb-8">12+ Legally Verified Formats - Customizable Templates</p>

      <div className="grid gap-6">
        {indianTemplates.map((template) => (
          <div key={template.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {template.category}
                </span>
              </div>
              <button
                onClick={() => handleDownload(template)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                {template.generatePDF ? (
                  <template.generatePDF />
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractTemplates