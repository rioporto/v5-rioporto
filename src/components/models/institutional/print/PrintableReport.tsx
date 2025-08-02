'use client';

import React from 'react';

interface ReportSection {
  title: string;
  content: React.ReactNode;
  pageBreak?: boolean;
}

interface PrintableReportProps {
  title: string;
  subtitle?: string;
  reportDate: string;
  generatedBy?: string;
  sections: ReportSection[];
  footer?: {
    company: string;
    contact: string;
    disclaimer?: string;
  };
  letterhead?: {
    logo?: string;
    companyName: string;
    address: string;
    phone: string;
    email: string;
  };
  className?: string;
}

export default function PrintableReport({
  title,
  subtitle,
  reportDate,
  generatedBy = 'Sistema RioPorto P2P',
  sections,
  footer = {
    company: 'RioPorto P2P',
    contact: 'contato@rioporto.com.br',
    disclaimer: 'Este documento é confidencial e destinado apenas ao uso autorizado.'
  },
  letterhead,
  className = ''
}: PrintableReportProps) {
  return (
    <div className={`print-container ${className}`}>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 1in;
            size: A4;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            font-family: 'Times New Roman', serif !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            color: black !important;
          }
          
          .print-container {
            background: white !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .page-break {
            page-break-before: always !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          .print-only {
            display: block !important;
          }
          
          .print-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 80px;
            background: white;
            border-bottom: 2px solid black;
            padding: 20px;
            margin-bottom: 20px;
          }
          
          .print-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: white;
            border-top: 1px solid black;
            padding: 15px 20px;
            font-size: 9pt;
          }
          
          .print-content {
            margin-top: 100px;
            margin-bottom: 80px;
            padding: 0 20px;
          }
          
          h1 { font-size: 18pt !important; margin-bottom: 20px !important; }
          h2 { font-size: 16pt !important; margin: 20px 0 15px 0 !important; }
          h3 { font-size: 14pt !important; margin: 15px 0 10px 0 !important; }
          h4 { font-size: 12pt !important; margin: 10px 0 8px 0 !important; }
          
          table {
            border-collapse: collapse !important;
            width: 100% !important;
            margin: 15px 0 !important;
          }
          
          th, td {
            border: 1px solid black !important;
            padding: 8px !important;
            text-align: left !important;
          }
          
          th {
            background-color: #f5f5f5 !important;
            font-weight: bold !important;
          }
          
          .chart-container {
            background: white !important;
            border: 1px solid black !important;
            padding: 20px !important;
          }
          
          .signature-line {
            border-bottom: 1px solid black;
            margin-top: 40px;
            margin-bottom: 5px;
            width: 300px;
          }
        }
        
        @media screen {
          .print-only {
            display: none;
          }
        }
      `}</style>

      {/* Letterhead (Print Only) */}
      {letterhead && (
        <div className="print-only print-header">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-black">{letterhead.companyName}</h1>
              <div className="text-sm text-black mt-2">
                <p>{letterhead.address}</p>
                <p>Tel: {letterhead.phone} | Email: {letterhead.email}</p>
              </div>
            </div>
            {letterhead.logo && (
              <img src={letterhead.logo} alt="Logo" className="h-16 w-auto" />
            )}
          </div>
        </div>
      )}

      {/* Report Content */}
      <div className="print-content bg-white">
        {/* Title Section */}
        <div className="text-center mb-8 pb-6 border-b-2 border-black print:border-black">
          <h1 className="text-3xl font-bold text-black mb-2">{title}</h1>
          {subtitle && (
            <h2 className="text-xl text-gray-700 print:text-black">{subtitle}</h2>
          )}
          <div className="mt-4 text-sm text-gray-600 print:text-black">
            <p>Data do Relatório: {new Date(reportDate).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p>Gerado por: {generatedBy}</p>
          </div>
        </div>

        {/* Report Sections */}
        {sections.map((section, index) => (
          <div 
            key={index} 
            className={`mb-8 ${section.pageBreak ? 'page-break' : ''}`}
          >
            <h2 className="text-2xl font-semibold text-black mb-4 pb-2 border-b border-gray-300 print:border-black">
              {section.title}
            </h2>
            <div className="text-black">
              {section.content}
            </div>
          </div>
        ))}

        {/* Signature Section (Print Only) */}
        <div className="print-only mt-16">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="signature-line"></div>
              <p className="text-sm text-center mt-2">Responsável pelo Relatório</p>
              <p className="text-xs text-center text-gray-600">Nome: ________________</p>
              <p className="text-xs text-center text-gray-600">Data: ________________</p>
            </div>
            <div>
              <div className="signature-line"></div>
              <p className="text-sm text-center mt-2">Aprovação</p>
              <p className="text-xs text-center text-gray-600">Nome: ________________</p>
              <p className="text-xs text-center text-gray-600">Data: ________________</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Print Only) */}
      <div className="print-only print-footer">
        <div className="flex justify-between items-center text-xs">
          <div>
            <p className="font-semibold">{footer.company}</p>
            <p>{footer.contact}</p>
          </div>
          <div className="text-right">
            <p>Página 1</p>
            <p>{new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        {footer.disclaimer && (
          <div className="mt-2 text-center text-xs text-gray-600 print:text-black">
            <p>{footer.disclaimer}</p>
          </div>
        )}
      </div>

      {/* Screen View Helper */}
      <div className="no-print mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Visualização para Impressão
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Este relatório está otimizado para impressão. Use Ctrl+P ou Cmd+P para imprimir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}