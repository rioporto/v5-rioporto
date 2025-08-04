'use client';

import { useEffect, useState } from 'react';

export default function Diagnostico() {
  const [mounted, setMounted] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Verificar se CSS foi carregado
    const testElement = document.createElement('div');
    testElement.className = 'bg-blue-500';
    document.body.appendChild(testElement);
    const computedStyle = window.getComputedStyle(testElement);
    const bgColor = computedStyle.backgroundColor;
    document.body.removeChild(testElement);
    
    // Se a cor não for rgba(0, 0, 0, 0) ou transparent, CSS foi carregado
    setCssLoaded(bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent');
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
        Diagnóstico de CSS - RioPorto
      </h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Status:</h2>
        <p>JavaScript: {mounted ? '✅ Funcionando' : '❌ Não carregado'}</p>
        <p>CSS Tailwind: {cssLoaded ? '✅ Carregado' : '❌ NÃO CARREGADO'}</p>
      </div>

      {/* Teste 1: Estilos inline (sempre funcionam) */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
          1. Estilos Inline (devem sempre funcionar):
        </h2>
        <div style={{ backgroundColor: '#ff0000', color: 'white', padding: '20px', marginBottom: '10px', borderRadius: '8px' }}>
          VERMELHO - Se você vê isto vermelho, o browser está funcionando
        </div>
        <div style={{ backgroundColor: '#0000ff', color: 'white', padding: '20px', marginBottom: '10px', borderRadius: '8px' }}>
          AZUL - Se você vê isto azul, o browser está funcionando
        </div>
        <div style={{ backgroundColor: '#00ff00', color: 'black', padding: '20px', marginBottom: '10px', borderRadius: '8px' }}>
          VERDE - Se você vê isto verde, o browser está funcionando
        </div>
      </div>

      {/* Teste 2: Classes de emergência */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
          2. Classes CSS Customizadas (adicionadas ao globals.css):
        </h2>
        <div className="emergency-red" style={{ marginBottom: '10px' }}>
          EMERGENCY RED - Se isto está vermelho, globals.css está carregando
        </div>
        <div className="emergency-blue" style={{ marginBottom: '10px' }}>
          EMERGENCY BLUE - Se isto está azul, globals.css está carregando
        </div>
        <div className="emergency-green" style={{ marginBottom: '10px' }}>
          EMERGENCY GREEN - Se isto está verde, globals.css está carregando
        </div>
      </div>

      {/* Teste 3: Classes Tailwind */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
          3. Classes Tailwind CSS:
        </h2>
        <div className="bg-red-500 text-white p-4 mb-2 rounded">
          TAILWIND RED - Se isto NÃO está vermelho, Tailwind não está funcionando
        </div>
        <div className="bg-blue-500 text-white p-4 mb-2 rounded">
          TAILWIND BLUE - Se isto NÃO está azul, Tailwind não está funcionando
        </div>
        <div className="bg-green-500 text-white p-4 mb-2 rounded">
          TAILWIND GREEN - Se isto NÃO está verde, Tailwind não está funcionando
        </div>
      </div>

      {/* Teste 4: CSS Variables do tema */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>
          4. CSS Variables do Tema:
        </h2>
        <div className="bg-background text-foreground p-4 mb-2 border border-border rounded">
          TEMA BACKGROUND - Se isto não tem estilo, CSS variables não funcionam
        </div>
        <div className="bg-primary text-primary-foreground p-4 mb-2 rounded">
          TEMA PRIMARY - Se isto não tem cor dourada, tema não está aplicado
        </div>
      </div>

      {/* Informações de Debug */}
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Informações de Debug:</h2>
        <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
        <p><strong>Tema HTML:</strong> {typeof document !== 'undefined' ? document.documentElement.className : 'N/A'}</p>
        <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
        
        {mounted && (
          <>
            <p><strong>Stylesheets carregados:</strong></p>
            <ul>
              {Array.from(document.styleSheets).map((sheet, i) => (
                <li key={i} style={{ fontSize: '12px', marginLeft: '20px' }}>
                  {sheet.href || 'Inline styles'}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#ffeeee', borderRadius: '8px' }}>
        <h3 style={{ color: '#cc0000' }}>RESULTADO DO DIAGNÓSTICO:</h3>
        <p>
          {!cssLoaded && (
            <>
              <strong>CSS NÃO ESTÁ CARREGANDO!</strong> Possíveis causas:<br/>
              1. Erro no build do Tailwind<br/>
              2. PostCSS não está processando<br/>
              3. Next.js não está incluindo o CSS<br/>
              4. Problema com importação no layout.tsx
            </>
          )}
          {cssLoaded && (
            <>
              <strong>CSS está carregando corretamente!</strong><br/>
              Verifique se todas as seções acima mostram as cores esperadas.
            </>
          )}
        </p>
      </div>
    </div>
  );
}