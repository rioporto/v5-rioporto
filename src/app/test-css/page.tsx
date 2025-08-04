export default function TestCSS() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Teste de CSS</h1>
      
      {/* Teste com classes do Tailwind */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Classes Tailwind Diretas:</h2>
        <div className="bg-blue-500 text-white p-4 rounded mb-2">
          Fundo Azul com Texto Branco
        </div>
        <div className="bg-green-500 text-white p-4 rounded mb-2">
          Fundo Verde com Texto Branco
        </div>
        <div className="bg-red-500 text-white p-4 rounded mb-2">
          Fundo Vermelho com Texto Branco
        </div>
      </div>

      {/* Teste com CSS variables */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">CSS Variables do Tema:</h2>
        <div className="bg-background text-foreground p-4 rounded border border-border mb-2">
          Background e Foreground do Tema
        </div>
        <div className="bg-primary text-primary-foreground p-4 rounded mb-2">
          Primary e Primary-Foreground
        </div>
        <div className="bg-secondary text-secondary-foreground p-4 rounded mb-2">
          Secondary e Secondary-Foreground
        </div>
      </div>

      {/* Teste inline styles */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Estilos Inline (devem sempre funcionar):</h2>
        <div style={{ backgroundColor: '#3B82F6', color: 'white', padding: '16px', borderRadius: '4px', marginBottom: '8px' }}>
          Fundo Azul Inline
        </div>
        <div style={{ backgroundColor: '#10B981', color: 'white', padding: '16px', borderRadius: '4px', marginBottom: '8px' }}>
          Fundo Verde Inline
        </div>
      </div>

      {/* Debug info */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>Se você vê cores nos estilos inline mas não nas classes, o CSS não está carregando.</p>
        <p>Se você não vê nenhuma cor, pode ser um problema de renderização.</p>
      </div>
    </div>
  );
}