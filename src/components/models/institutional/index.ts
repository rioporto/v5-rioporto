/**
 * Institutional Model Components
 * Professional, conservative, and corporate design system
 */

// Core Components (NEW)
export { default as InstitutionalButton } from './InstitutionalButton';
export { default as InstitutionalCard, InstitutionalCardHeader, InstitutionalCardFooter } from './InstitutionalCard';
export { default as InstitutionalHeader } from './InstitutionalHeader';
export { default as InstitutionalTable } from './InstitutionalTable';
export { default as InstitutionalForm, InstitutionalInput, InstitutionalTextArea, InstitutionalSelect, InstitutionalCheckbox, InstitutionalRadioGroup, InstitutionalFormGroup } from './InstitutionalForm';
export { default as InstitutionalNav, InstitutionalBreadcrumb, InstitutionalTabs } from './InstitutionalNav';
export { default as InstitutionalFooter } from './InstitutionalFooter';

// Trust Components (NEW)
export { default as SecurityBadge, SecurityBadgeGrid, SecurityStatus } from './trust/SecurityBadge';
export { default as CertificationDisplay } from './trust/CertificationDisplay';
export { default as ComplianceBadge, ComplianceDashboard } from './trust/ComplianceBadge';
export { default as TrustSeals, TrustScoreSummary } from './trust/TrustSeals';
export { default as PartnerLogos } from './trust/PartnerLogos';

// Corporate Components (NEW)
export { default as ExecutiveTeam } from './corporate/ExecutiveTeam';
export { default as CompanyStats } from './corporate/CompanyStats';

// Reports (EXISTING)
export { default as DataTable } from './reports/DataTable';
export { default as FinancialReport } from './reports/FinancialReport';
export { default as PerformanceChart } from './reports/PerformanceChart';
export { default as ComparisonTable } from './reports/ComparisonTable';
export { default as ExportableReport } from './reports/ExportableReport';

// Analysis (EXISTING)
export { default as MarketAnalysis } from './analysis/MarketAnalysis';
export { default as RiskAssessment } from './analysis/RiskAssessment';
export { default as ROICalculator } from './analysis/ROICalculator';

// Dashboard (EXISTING)
export { default as ExecutiveSummary } from './dashboard/ExecutiveSummary';
export { default as KPIDisplay } from './dashboard/KPIDisplay';

// Forms (EXISTING)
export { default as InvestmentForm } from './forms/InvestmentForm';

// Print (EXISTING)
export { default as PrintableReport } from './print/PrintableReport';

// Credibility Components (NEW - M4 Trust Elements)
export { Awards } from './credibility/Awards';
export { Certifications } from './credibility/Certifications'; 
export { Partnerships } from './credibility/Partnerships';

// Security Components (NEW - M4 Trust Elements)
export { SecurityFeatures } from './security/SecurityFeatures';

// Testimonials Components (NEW - M4 Trust Elements)
export { ClientTestimonials } from './testimonials/ClientTestimonials';

// Legal Components (NEW - M4 Trust Elements)
export { LegalDisclaimer } from './legal/LegalDisclaimer';

// Export all from sub-modules
export * from './credibility';
export * from './security';
export * from './testimonials';
export * from './legal';