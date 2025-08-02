'use client';

import React, { useRef } from 'react';
import { 
  Download as DocumentArrowDownIcon, 
  Printer as PrinterIcon, 
  Share as ShareIcon,
  Table as TableCellsIcon
} from 'lucide-react';

interface ExportableReportProps {
  title: string;
  children: React.ReactNode;
  data?: any[];
  filename?: string;
  showExportOptions?: boolean;
  className?: string;
}

export default function ExportableReport({
  title,
  children,
  data = [],
  filename = 'relatorio',
  showExportOptions = true,
  className = ''
}: ExportableReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (typeof window !== 'undefined') {
      try {
        // Usar html2pdf se disponível
        // @ts-ignore - Optional dependency
        const { default: html2pdf } = await import('html2pdf.js');
        
        const element = reportRef.current;
        if (!element) return;

        const opt = {
          margin: 1,
          filename: `${filename}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
      } catch (error) {
        console.error('Erro ao exportar PDF:', error);
        // Fallback para impressão
        handlePrint();
      }
    }
  };

  const handleExportCSV = () => {
    if (!data || data.length === 0) {
      alert('Nenhum dado disponível para exportação CSV');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape vírgulas e aspas
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Relatório: ${title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
        // Fallback para copiar link
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      }
    } else {
      // Fallback para clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      } catch (error) {
        console.error('Erro ao copiar link:', error);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Export Controls */}
      {showExportOptions && (
        <div className="mb-4 flex justify-end space-x-2 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PrinterIcon className="h-4 w-4 mr-2" />
            Imprimir
          </button>
          
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            PDF
          </button>

          {data.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <TableCellsIcon className="h-4 w-4 mr-2" />
              CSV
            </button>
          )}

          <button
            onClick={handleShare}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ShareIcon className="h-4 w-4 mr-2" />
            Compartilhar
          </button>
        </div>
      )}

      {/* Report Content */}
      <div 
        ref={reportRef}
        className="print:p-0 print:m-0 print:shadow-none"
      >
        {/* Print Header */}
        <div className="hidden print:block mb-8">
          <div className="text-center border-b-2 border-gray-400 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">RioPorto P2P</h1>
            <h2 className="text-xl font-semibold text-black">{title}</h2>
            <p className="text-sm text-gray-700 mt-2">
              Gerado em: {new Date().toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Main Content */}
        {children}

        {/* Print Footer */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-400">
          <div className="flex justify-between text-xs text-gray-600">
            <div>
              <p>Este documento é confidencial e destinado apenas ao uso autorizado.</p>
              <p>RioPorto P2P - Plataforma de Investimentos</p>
            </div>
            <div className="text-right">
              <p>www.rioporto.com.br</p>
              <p>Página 1</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.75in;
            size: A4;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          body {
            font-family: 'Times New Roman', serif !important;
            font-size: 12pt !important;
            line-height: 1.4 !important;
            color: black !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .print\\:text-black {
            color: black !important;
          }
          
          .print\\:bg-white {
            background-color: white !important;
          }
          
          .print\\:border-gray-400 {
            border-color: #9CA3AF !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:break-inside-avoid {
            break-inside: avoid !important;
          }
          
          table {
            border-collapse: collapse !important;
          }
          
          th, td {
            border: 1px solid #9CA3AF !important;
            padding: 8px !important;
          }
          
          .print\\:h-64 {
            height: 16rem !important;
          }
        }
      `}</style>
    </div>
  );
}