# Institutional Model Components

Design system profissional e corporativo para o modelo institutional do RioPorto P2P. Focado em confiança, hierarquia tradicional, e aparência conservadora para usuários corporativos e institucionais.

## 🏢 Características Principais

- **Design Conservador**: Layout tradicional com hierarquia clara
- **Elementos de Confiança**: Badges de segurança, certificações, selos
- **Tipografia Corporativa**: Merriweather para títulos, Arial para corpo
- **Paleta Profissional**: Azul marinho (#003366), Azul (#0066CC), Cinza (#F5F5F5)
- **Animações Mínimas**: Transições sutis de 300ms
- **Print-Friendly**: Otimizado para impressão e apresentações
- **Acessibilidade Máxima**: Conformidade WCAG 2.1 AA

## 🎨 Design System

### Cores
- **Primário**: Azul Marinho (#003366)
- **Secundário**: Azul (#0066CC)  
- **Background**: Cinza Claro (#F5F5F5)
- **Superfície**: Branco (#FFFFFF)
- **Sucesso**: Verde Corporativo (#1E7A3E)
- **Erro**: Vermelho Profissional (#C73E1D)
- **Aviso**: Âmbar (#F5A623)

### Tipografia
- **Títulos**: Merriweather (serif) - Autoridade e tradição
- **Corpo**: Arial, Helvetica - Legibilidade e profissionalismo
- **Monospace**: Consolas, Courier New - Dados técnicos

### Espaçamento & Layout  
- **Container**: max-width 1200px
- **Grid**: Traditional 12-column grid
- **Padding**: 24px containers, 16px components
- **Border Radius**: Conservative 4px (0.25rem)
- **Shadows**: Subtle corporate shadows

## 🧱 Componentes Principais

### InstitutionalButton
Botões formais e conservadores com hierarquia clara.

```tsx
import { InstitutionalButton } from '@/components/models/institutional';

<InstitutionalButton variant="primary" size="lg" loading={false}>
  Solicitar Proposta
</InstitutionalButton>
```

**Variantes:** `primary`, `secondary`, `outline`, `ghost`, `destructive`
**Tamanhos:** `sm`, `md`, `lg`, `xl`

### InstitutionalCard
Cards com bordas definidas e estrutura formal.

```tsx
import { InstitutionalCard, InstitutionalCardHeader } from '@/components/models/institutional';

<InstitutionalCard variant="elevated" padding="lg">
  <InstitutionalCardHeader 
    title="Relatório Financeiro"
    subtitle="Q4 2024"
    actions={<button>Exportar</button>}
  />
  Conteúdo do card...
</InstitutionalCard>
```

### InstitutionalHeader
Header corporativo com navegação clássica.

```tsx
import { InstitutionalHeader } from '@/components/models/institutional';

<InstitutionalHeader
  title="RioPorto Institucional"
  navigation={navigationItems}
  userMenu={{
    name: "João Silva",
    email: "joao@empresa.com",
    role: "Diretor Financeiro"
  }}
  notifications={true}
  search={true}
/>
```

### InstitutionalTable
Tabelas formais com recursos avançados.

```tsx
import { InstitutionalTable } from '@/components/models/institutional';

<InstitutionalTable
  columns={tableColumns}
  data={tableData}
  pagination={paginationConfig}
  sortConfig={sortConfig}
  searchable={true}
  exportable={true}
  title="Transações Corporativas"
/>
```

### InstitutionalForm
Formulários estruturados e profissionais.

```tsx
import { 
  InstitutionalForm, 
  InstitutionalInput,
  InstitutionalSelect,
  InstitutionalFormGroup 
} from '@/components/models/institutional';

<InstitutionalForm title="Abertura de Conta Corporativa">
  <InstitutionalFormGroup title="Dados da Empresa">
    <InstitutionalInput
      label="Razão Social"
      required
      description="Nome completo da empresa"
    />
    <InstitutionalSelect
      label="Tipo de Empresa"
      options={tiposEmpresa}
      required
    />
  </InstitutionalFormGroup>
</InstitutionalForm>
```

### InstitutionalNav & InstitutionalTabs
Navegação clássica e abas profissionais.

```tsx
import { InstitutionalNav, InstitutionalTabs } from '@/components/models/institutional';

// Menu superior tradicional
<InstitutionalNav
  items={menuItems}
  orientation="horizontal"
  variant="primary"
  size="md"
/>

// Abas para conteúdo
<InstitutionalTabs
  items={tabItems}
  variant="default"
  size="md"
  activeKey="overview"
/>
```

## 🛡️ Componentes de Confiança (`/trust`)

### SecurityBadge
Badges de segurança e certificações.

```tsx
import { SecurityBadge, SecurityBadgeGrid } from '@/components/models/institutional/trust';

<SecurityBadgeGrid
  badges={[
    { type: 'ssl', status: 'active', title: 'SSL 256-bit' },
    { type: 'audit', status: 'verified', certificationBody: 'Ernst & Young' },
    { type: 'compliance', status: 'active', validUntil: '2025-12-31' }
  ]}
  columns={3}
  variant="detailed"
/>
```

### CertificationDisplay
Display de certificações corporativas.

```tsx
import { CertificationDisplay } from '@/components/models/institutional/trust';

<CertificationDisplay
  certifications={certificationData}
  variant="grid"
  showExpired={false}
  groupByCategory={true}
/>
```

### ComplianceBadge & ComplianceDashboard  
Indicadores de compliance regulatório.

```tsx
import { ComplianceDashboard } from '@/components/models/institutional/trust';

<ComplianceDashboard
  items={complianceItems}
  showSummary={true}
/>
```

### TrustSeals
Selos de confiança de autoridades.

```tsx
import { TrustSeals, TrustScoreSummary } from '@/components/models/institutional/trust';

<TrustSeals
  seals={trustSealsData}
  variant="grid"
  showDetails={true}
  maxItems={8}
/>

<TrustScoreSummary
  seals={trustSealsData}
/>
```

### PartnerLogos
Logos de parceiros e instituições.

```tsx
import { PartnerLogos } from '@/components/models/institutional/trust';

<PartnerLogos
  partners={partnerData}
  variant="carousel"
  groupByCategory={false}
  showFeaturedOnly={true}
  maxItems={12}
  autoScroll={true}
/>
```

## 🏢 Componentes Corporativos (`/corporate`)

### ExecutiveTeam
Apresentação da equipe executiva.

```tsx
import { ExecutiveTeam } from '@/components/models/institutional/corporate';

<ExecutiveTeam
  executives={executiveData}
  variant="grid"
  showBio={true}
  showEducation={true}
  showExperience={true}
  maxBioLength={200}
/>
```

### CompanyStats
Estatísticas e métricas da empresa.

```tsx
import { CompanyStats } from '@/components/models/institutional/corporate';

<CompanyStats
  stats={companyStatsData}
  variant="highlight"
  showTrends={true}
  showDescriptions={true}
  animateCounters={true}
  groupByCategory={true}
/>
```

## 📊 Componentes de Relatórios (`/reports`)

### DataTable
Tabela de dados profissional com recursos avançados:
- Ordenação por colunas
- Paginação
- Formatação de valores (moeda, porcentagem, números)
- Filtros e busca
- Export para CSV/Excel

```tsx
import { DataTable } from '@/components/models/institutional';

<DataTable
  data={transactionsData}
  columns={[
    { key: 'date', label: 'Data', type: 'date', sortable: true },
    { key: 'amount', label: 'Valor', type: 'currency', sortable: true },
    { key: 'status', label: 'Status', type: 'text' }
  ]}
  title="Relatório de Transações"
  pagination={true}
  pageSize={20}
/>
```

### FinancialReport
Relatório financeiro estruturado:
- Resumo executivo
- Métricas principais
- Seções categorizadas
- Indicadores de performance
- Layout para impressão

### PerformanceChart
Gráficos de performance com múltiplos tipos:
- Line charts para tendências
- Bar charts para comparações
- Doughnut charts para distribuições
- Suporte a múltiplas séries de dados
- Exportação para imagem

### ComparisonTable
Tabela comparativa com indicadores:
- Comparação período a período
- Benchmarks do setor
- Indicadores de meta
- Visualização de tendências
- Status de performance

### ExportableReport
Container para relatórios exportáveis:
- Export para PDF
- Print otimizado
- Export para CSV
- Compartilhamento
- Controles de exportação

## 📈 Componentes de Análise (`/analysis`)

### MarketAnalysis
Análise completa de mercado:
- Visão geral do mercado
- Indicadores principais
- Segmentos de mercado
- Insights e oportunidades
- Avaliação de riscos

### RiskAssessment
Avaliação detalhada de riscos:
- Fatores de risco categorizados
- Métricas de risco (VaR, Sharpe, etc.)
- Status de mitigação
- Recomendações
- Distribuição por nível de risco

### ROICalculator
Calculadora interativa de ROI:
- Múltiplos cenários
- Projeções temporais
- Consideração de impostos
- Comparação de produtos
- Análise de break-even

## 🎯 Componentes de Dashboard (`/dashboard`)

### ExecutiveSummary
Resumo executivo completo:
- KPIs principais
- Alertas e notificações
- Resumos financeiro e operacional
- Destaques do período
- Iniciativas estratégicas

### KPIDisplay
Display profissional de KPIs:
- Agrupamento por categoria
- Indicadores de meta
- Benchmarks do setor
- Tendências temporais
- Status visual por cores

## 📝 Componentes de Formulários (`/forms`)

### InvestmentForm
Formulário estruturado para investimentos:
- Wizard multi-step
- Validação em tempo real
- Perfil do investidor
- Seleção de produtos
- Projeções automáticas

## 🖨️ Componentes de Impressão (`/print`)

### PrintableReport
Relatório otimizado para impressão:
- Layout profissional
- Cabeçalho e rodapé
- Quebras de página inteligentes
- Assinaturas
- Numeração de páginas

## 🎨 Design System

### Cores
- **Primária**: Azul profissional (#3B82F6)
- **Secundária**: Cinza corporativo (#6B7280)
- **Sucesso**: Verde (#10B981)
- **Alerta**: Amarelo (#F59E0B)
- **Erro**: Vermelho (#EF4444)

### Tipografia
- **Títulos**: Inter/Roboto, weights 600-700
- **Corpo**: Inter/Roboto, weight 400-500
- **Impressão**: Times New Roman (compatibilidade)

### Espaçamento
- **Containers**: 24px padding
- **Seções**: 32px margin bottom
- **Elementos**: 16px spacing
- **Componentes**: 8px internal padding

## 📱 Responsividade

Todos os componentes são responsivos:
- **Desktop**: Layout completo com todas as features
- **Tablet**: Layout adaptado, mantendo funcionalidade
- **Mobile**: Layout simplificado, funcionalidade essencial
- **Print**: Layout otimizado para A4

## 🔧 Uso Recomendado

### Para Relatórios Financeiros
```tsx
import { FinancialReport, ExportableReport } from '@/components/models/institutional';

<ExportableReport filename="relatorio-mensal">
  <FinancialReport
    title="Relatório Mensal"
    period="Janeiro 2024"
    sections={financialSections}
    summary={summaryData}
  />
</ExportableReport>
```

### Para Dashboards Executivos
```tsx
import { ExecutiveSummary, KPIDisplay } from '@/components/models/institutional';

<div className="space-y-6">
  <ExecutiveSummary
    period="Q1 2024"
    keyMetrics={metrics}
    highlights={highlights}
  />
  <KPIDisplay
    kpis={kpiData}
    groupByCategory={true}
    showBenchmarks={true}
  />
</div>
```

### Para Análise de Investimentos
```tsx
import { ROICalculator, RiskAssessment } from '@/components/models/institutional';

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <ROICalculator
    initialInvestment={100000}
    scenarios={investmentScenarios}
  />
  <RiskAssessment
    riskFactors={riskData}
    portfolio="Portfolio Institucional"
  />
</div>
```

## 🔒 Compliance e Segurança

- **LGPD**: Componentes não armazenam dados pessoais
- **Auditoria**: Logs de exportação e visualização
- **Assinatura Digital**: Suporte a assinatura em relatórios
- **Watermark**: Proteção para documentos sensíveis

## 📋 Boas Práticas

1. **Sempre use formatação de moeda brasileira** nos valores
2. **Inclua disclaimers** em relatórios financeiros
3. **Teste a impressão** antes de finalizar relatórios
4. **Valide dados** antes de exibir métricas
5. **Use loading states** para operações assíncronas

## 🧪 Testes

Componentes incluem:
- Testes unitários (Jest)
- Testes de snapshot
- Testes de impressão
- Validação de acessibilidade
- Testes de responsividade

## 📦 Dependências

- React 18+
- TypeScript 5+
- Chart.js (gráficos)
- html2pdf.js (exportação)
- Heroicons (ícones)
- Tailwind CSS (styling)

## 🚀 Performance

- Lazy loading para gráficos
- Memoização de cálculos
- Virtualização para tabelas grandes
- Otimização de bundle
- Cache de componentes

---

## 🛡️ M4 Trust Elements (NOVO)

### Elementos de Confiança e Credibilidade

Os **M4 Trust Elements** foram implementados pelo Agente 17 para criar uma experiência institucional que transmite máxima confiança e credibilidade.

#### 🏆 Credibility Components (`/credibility`)

**Awards.tsx** - Prêmios e Reconhecimentos
```tsx
import { Awards } from '@/components/models/institutional/credibility/Awards';

<Awards variant="timeline" showAll={true} />
```

**Certifications.tsx** - Certificações Oficiais
```tsx
import { Certifications } from '@/components/models/institutional/credibility/Certifications';

<Certifications variant="detailed" showExpired={false} />
```

**Partnerships.tsx** - Parcerias Estratégicas
```tsx
import { Partnerships } from '@/components/models/institutional/credibility/Partnerships';

<Partnerships variant="detailed" showAll={false} />
```

#### 🔒 Security Components (`/security`)

**SecurityFeatures.tsx** - Recursos de Segurança
```tsx
import { SecurityFeatures } from '@/components/models/institutional/security/SecurityFeatures';

<SecurityFeatures variant="detailed" showCategories={true} />
```

#### 💬 Testimonials Components (`/testimonials`)

**ClientTestimonials.tsx** - Depoimentos Corporativos
```tsx
import { ClientTestimonials } from '@/components/models/institutional/testimonials/ClientTestimonials';

<ClientTestimonials variant="masonry" showMetrics={true} />
```

#### ⚖️ Legal Components (`/legal`)

**LegalDisclaimer.tsx** - Avisos Legais
```tsx
import { LegalDisclaimer } from '@/components/models/institutional/legal/LegalDisclaimer';

<LegalDisclaimer variant="full" showLastUpdated={true} />
```

### Páginas Institucionais (`/app/(institutional)`)

- **about/page.tsx** - Sobre a empresa
- **team/page.tsx** - Equipe executiva  
- **compliance/page.tsx** - Compliance e regulação
- **investors/page.tsx** - Relações com investidores
- **press/page.tsx** - Sala de imprensa

### Design System M4

#### Paleta de Cores Trust
- **Trust Blue**: `#2563eb` - Cor principal de confiança
- **Security Red**: `#dc2626` - Elementos de segurança
- **Compliance Green**: `#059669` - Status de conformidade
- **Quality Purple**: `#7c3aed` - Certificações de qualidade

#### Componentes Visuais
- **Certificações destacadas visualmente**
- **Depoimentos com métricas verificáveis**
- **Gráficos corporativos sérios**
- **Corporate feel consistente**
- **Compliance visual em destaque**

### Exemplo de Uso Completo

```tsx
import { 
  Awards, 
  Certifications, 
  SecurityFeatures,
  ClientTestimonials,
  LegalDisclaimer 
} from '@/components/models/institutional';

function InstitutionalTrustPage() {
  return (
    <div className="space-y-16">
      <Awards variant="grid" />
      <Certifications variant="detailed" />
      <SecurityFeatures variant="grid" />
      <ClientTestimonials showMetrics={true} />
      <LegalDisclaimer variant="summary" />
    </div>
  );
}
```

### Documentação Completa

Para documentação detalhada, consulte:
- **INSTITUTIONAL-GUIDE.md** - Guia completo de implementação
- **Código comentado** - Todos os componentes têm documentação inline
- **TypeScript interfaces** - Tipos exportados para facilitar uso

---

**Desenvolvido para RioPorto P2P** - Modelo Institutional  
Componentes profissionais para apresentações corporativas e relatórios executivos.

**M4 Trust Elements implementados por**: Agente 17  
**Status**: ✅ Completo - Março 2024