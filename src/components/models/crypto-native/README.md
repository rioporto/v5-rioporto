# Crypto Native Design System

Design system futurístico com glassmorphism, efeitos neon e apelo Gen Z para o modelo **Crypto Native** do projeto RioPorto P2P.

## 🎨 Características Visuais

### Tema Principal
- **Cores**: Roxo Neon (#9945FF), Verde Neon (#00FFA3), Background Ultra Dark (#0D0D0D)
- **Efeitos**: Glassmorphism everywhere, glow effects, gradientes holográficos
- **Tipografia**: Space Grotesk (primary), Fira Code (mono), Orbitron (display)
- **Estilo**: Gen Z appeal, futurístico, cyberpunk aesthetics

### Paleta de Cores
```css
--primary: #9945FF        /* Roxo Neon */
--accent: #00FFA3         /* Verde Neon */
--success: #00FFA3        /* Verde Neon */
--error: #FF3366          /* Vermelho Neon */
--warning: #FFCC00        /* Amarelo Neon */
--background: #0D0D0D     /* Ultra Dark */
--foreground: #FAFAFA     /* Branco Puro */
--glass: rgba(255,255,255,0.05)  /* Glassmorphism */
```

## 🧩 Componentes Principais

### CryptoButton
Botões com efeitos neon e variações holográficas.

```tsx
import { CryptoButton } from '@/components/models/crypto-native';

<CryptoButton 
  variant="neon" 
  color="purple" 
  glow={true}
  size="lg"
>
  Connect Wallet
</CryptoButton>
```

**Variantes**: `neon`, `glass`, `holographic`, `outline`, `ghost`
**Cores**: `purple`, `green`, `blue`, `pink`, `yellow`

### CryptoCard
Cards com glassmorphism e efeitos de brilho.

```tsx
import { CryptoCard, CryptoCardHeader, CryptoCardTitle, CryptoCardContent } from '@/components/models/crypto-native';

<CryptoCard variant="glass" glow={true}>
  <CryptoCardHeader>
    <CryptoCardTitle glow={true}>NFT Collection</CryptoCardTitle>
  </CryptoCardHeader>
  <CryptoCardContent>
    Conteúdo do card com glassmorphism
  </CryptoCardContent>
</CryptoCard>
```

**Variantes**: `glass`, `neon`, `holographic`, `solid`

### CryptoHeader
Header futurístico com backdrop blur e efeitos neon.

```tsx
import { 
  CryptoHeader, 
  CryptoHeaderContent, 
  CryptoHeaderBrand, 
  CryptoHeaderNav,
  CryptoHeaderLink 
} from '@/components/models/crypto-native';

<CryptoHeader variant="glass" blur={true} glow={true}>
  <CryptoHeaderContent>
    <CryptoHeaderBrand glow={true}>
      RioPorto P2P
    </CryptoHeaderBrand>
    <CryptoHeaderNav>
      <CryptoHeaderLink active={true}>Dashboard</CryptoHeaderLink>
      <CryptoHeaderLink>Trading</CryptoHeaderLink>
    </CryptoHeaderNav>
  </CryptoHeaderContent>
</CryptoHeader>
```

### CryptoInput
Inputs com glassmorphism e efeitos neon no focus.

```tsx
import { CryptoInput } from '@/components/models/crypto-native';

<CryptoInput
  variant="glass"
  glow={true}
  label="Wallet Address"
  placeholder="0x..."
  icon={<WalletIcon />}
/>
```

**Variantes**: `glass`, `neon`, `holographic`, `minimal`

### CryptoBadge
Badges holográficos com diferentes raridades.

```tsx
import { CryptoBadge } from '@/components/models/crypto-native';

<CryptoBadge 
  variant="holographic" 
  color="purple" 
  glow={true}
  icon={<StarIcon />}
>
  Legendary
</CryptoBadge>
```

## ✨ Efeitos Visuais

### GlowEffect
Efeitos de brilho neon personalizáveis.

```tsx
import { GlowEffect, NeonText, GlowOrb } from '@/components/models/crypto-native/effects';

<GlowEffect color="purple" intensity="high" animated={true}>
  <div>Conteúdo com glow</div>
</GlowEffect>

<NeonText color="green" intensity="extreme">
  Texto com Neon Glow
</NeonText>

<GlowOrb color="blue" size="lg" floating={true} />
```

### GlassmorphismBox
Containers com efeito de vidro e blur.

```tsx
import { GlassmorphismBox, GlassCard, FrostedGlass } from '@/components/models/crypto-native/effects';

<GlassmorphismBox 
  variant="medium" 
  blur="xl" 
  borderGlow={true}
  noise={true}
>
  Conteúdo com glassmorphism
</GlassmorphismBox>

<FrostedGlass intensity="heavy" tint="purple">
  Efeito vidro fosco
</FrostedGlass>
```

### HolographicShimmer
Efeitos holográficos e shimmer.

```tsx
import { 
  HolographicShimmer, 
  RainbowShimmer, 
  IridescentText,
  HolographicBorder 
} from '@/components/models/crypto-native/effects';

<HolographicShimmer variant="rainbow" speed="medium">
  <div>Shimmer holográfico</div>
</HolographicShimmer>

<IridescentText animated={true} speed="fast">
  Texto Iridescente
</IridescentText>

<HolographicBorder thickness={2} glow={true}>
  Borda holográfica animada
</HolographicBorder>
```

### GradientBorder
Bordas com gradientes animados.

```tsx
import { 
  GradientBorder, 
  AnimatedGradientBox, 
  NeonBorder,
  PulsatingBorder 
} from '@/components/models/crypto-native/effects';

<GradientBorder 
  variant="rainbow" 
  thickness={3} 
  animated={true}
  glow={true}
>
  Conteúdo com borda gradiente
</GradientBorder>

<NeonBorder color="purple" intensity="high">
  Borda neon pulsante
</NeonBorder>
```

### ParticlesBackground
Backgrounds com partículas e efeitos atmosféricos.

```tsx
import { 
  ParticlesBackground, 
  FloatingElements, 
  MatrixRain,
  StarField 
} from '@/components/models/crypto-native/effects';

<ParticlesBackground 
  particleCount={150}
  colors={['#9945FF', '#00FFA3', '#FF6B9D']}
  interactive={true}
  connections={true}
/>

<FloatingElements density="high">
  <MatrixRain characters={['₿', 'Ξ', '0', '1']} speed="medium" />
</FloatingElements>

<StarField stars={300} speed="fast" />
```

## 🌐 Componentes Web3

### WalletCard
Cards estilizados para carteiras crypto.

```tsx
import { WalletCard, MultiWalletCard } from '@/components/models/crypto-native/web3';

<WalletCard
  wallet={{
    address: '0x742d35Cc6aB1d73E4b3b9823b36c8f7d73a2d3e1',
    balance: '2.5',
    currency: 'ETH',
    usdValue: '4,250.00',
    network: 'Ethereum',
    connected: true,
    ens: 'cryptouser.eth'
  }}
  variant="glass"
  onConnect={() => console.log('Connect')}
  onDisconnect={() => console.log('Disconnect')}
  showQR={true}
/>
```

### NFTDisplay
Display avançado para NFTs com raridades.

```tsx
import { NFTDisplay, NFTGrid } from '@/components/models/crypto-native/web3';

<NFTDisplay
  nft={{
    id: '1',
    name: 'Cosmic Ape #1337',
    collection: 'Cosmic Apes',
    image: '/nft-image.jpg',
    rarity: 'legendary',
    price: '2.5',
    currency: 'ETH',
    attributes: [
      { trait_type: 'Background', value: 'Holographic' },
      { trait_type: 'Eyes', value: 'Neon' }
    ]
  }}
  variant="showcase"
  size="lg"
  onView={() => console.log('View NFT')}
  onBuy={() => console.log('Buy NFT')}
/>

<NFTGrid 
  nfts={nftArray} 
  columns={3} 
  variant="gallery"
  onNFTView={(nft) => console.log('View', nft)}
/>
```

## 🎛️ Utilitários

### Funções Helper

```tsx
import { cryptoNativeUtils } from '@/components/models/crypto-native';

// Formatar endereços
const shortAddress = cryptoNativeUtils.formatAddress('0x742d35Cc6aB1d73E4b3b9823b36c8f7d73a2d3e1');
// Output: "0x742d...2d3e1"

// Formatar valores crypto
const formattedAmount = cryptoNativeUtils.formatCryptoAmount(2.50789, 4);
// Output: "2.5079"

// Formatar valores USD
const usdAmount = cryptoNativeUtils.formatUSDAmount(4250.75);
// Output: "$4,250.75"

// Obter cor da raridade
const rarityColor = cryptoNativeUtils.getRarityColor('legendary');
// Output: "#EAB308"

// Obter cor da rede
const networkColor = cryptoNativeUtils.getNetworkColor('ethereum');
// Output: "#627EEA"
```

### Presets Configurados

```tsx
import { cryptoNativePresets } from '@/components/models/crypto-native';

// Usar presets para componentes
<CryptoCard {...cryptoNativePresets.card}>
  Conteúdo
</CryptoCard>

<CryptoButton {...cryptoNativePresets.button}>
  Botão
</CryptoButton>
```

### Classes CSS Utilitárias

```css
/* Efeitos de texto */
.text-glow       { text-shadow: 0 0 10px currentColor; }
.text-glow-sm    { text-shadow: 0 0 5px currentColor; }
.text-glow-lg    { text-shadow: 0 0 20px currentColor; }

/* Backgrounds glass */
.bg-glass        { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); }
.bg-glass-heavy  { background: rgba(255,255,255,0.12); backdrop-filter: blur(30px); }

/* Bordas glass */
.border-glass    { border: 1px solid rgba(255,255,255,0.1); }

/* Shadows neon */
.shadow-neon         { box-shadow: 0 0 20px rgba(153,69,255,0.5); }
.shadow-neon-accent  { box-shadow: 0 0 20px rgba(0,255,163,0.5); }
```

## 🎬 Animações

### Classes de Animação

```tsx
import { cryptoNativeAnimations } from '@/components/models/crypto-native';

<div className={cryptoNativeAnimations.fadeInUp}>
  Fade in com movimento para cima
</div>

<div className={cryptoNativeAnimations.glowPulse}>
  Pulsação com glow
</div>

<div className={cryptoNativeAnimations.holographic}>
  Efeito holográfico
</div>
```

### Animações Disponíveis
- `fadeInUp` - Fade in com movimento vertical
- `fadeInScale` - Fade in com escala
- `slideInRight` - Deslize da direita
- `glowPulse` - Pulsação com glow
- `holographic` - Gradiente holográfico
- `neonPulse` - Pulsação neon
- `float` - Flutuação suave
- `shimmer` - Efeito shimmer

## 🔧 Configuração

### CSS Variables

```css
:root {
  --crypto-primary: #9945FF;
  --crypto-accent: #00FFA3;
  --crypto-success: #00FFA3;
  --crypto-error: #FF3366;
  --crypto-warning: #FFCC00;
  --crypto-background: #0D0D0D;
  --crypto-foreground: #FAFAFA;
  --crypto-glass: rgba(255, 255, 255, 0.05);
  --crypto-border: rgba(255, 255, 255, 0.15);
  --crypto-glow-primary: 0 0 20px rgba(153, 69, 255, 0.5);
  --crypto-glow-accent: 0 0 20px rgba(0, 255, 163, 0.5);
  --crypto-blur: blur(20px);
  --crypto-radius: 0.75rem;
  --crypto-transition: 300ms ease;
}
```

### Importar Estilos

```tsx
import '@/styles/models/crypto-native.css';
```

## 📱 Responsividade

O design system é **mobile-first** e inclui:
- Ajustes automáticos de glassmorphism para performance mobile
- Efeitos neon reduzidos em dispositivos móveis
- Animações simplificadas para preservar bateria
- Breakpoints otimizados para todas as telas

## ♿ Acessibilidade

### Recursos Incluídos
- Suporte a **high contrast mode**
- Compatibilidade com **prefers-reduced-motion**
- Focus indicators visíveis
- Screen reader friendly
- Keyboard navigation suportada
- ARIA labels completos

### Modo Alto Contraste
```css
@media (prefers-contrast: high) {
  .glass {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
}
```

### Movimento Reduzido
```css
@media (prefers-reduced-motion: reduce) {
  .holographic,
  .neon-pulse,
  .glow-pulse {
    animation: none;
  }
}
```

## 🎯 Casos de Uso

### Trading Interface
```tsx
<CryptoGlassPanel variant="heavy" blur="xl">
  <CryptoHeader variant="gradient">
    <CryptoHeaderBrand>Trading Panel</CryptoHeaderBrand>
  </CryptoHeader>
  
  <div className="p-6 space-y-4">
    <CryptoInput 
      variant="neon" 
      label="Buy Amount" 
      icon={<CoinIcon />}
    />
    
    <CryptoButton variant="neon" color="green" size="lg" glow={true}>
      Execute Trade
    </CryptoButton>
  </div>
</CryptoGlassPanel>
```

### NFT Marketplace
```tsx
<div className="relative">
  <ParticlesBackground 
    colors={['#9945FF', '#00FFA3']} 
    interactive={true}
  />
  
  <NFTGrid 
    nfts={collections} 
    variant="showcase"
    columns={3}
    onNFTView={handleView}
    onNFTBuy={handleBuy}
  />
</div>
```

### Wallet Dashboard
```tsx
<CryptoGlassContainer padding="lg">
  <WalletCard 
    wallet={userWallet}
    variant="holographic"
    showQR={true}
  />
  
  <div className="mt-6 grid grid-cols-2 gap-4">
    <CryptoCard variant="glass" glow={true}>
      <GlowEffect color="green" intensity="medium">
        <div className="text-center">
          <NeonText color="green">Portfolio Value</NeonText>
          <div className="price-display text-2xl mt-2">
            $24,567.89
          </div>
        </div>
      </GlowEffect>
    </CryptoCard>
  </div>
</CryptoGlassContainer>
```

## 🏆 Status

✅ **Implementação Completa**  
🎨 **Design System**: Crypto Native  
👨‍💻 **Agente**: M3 Design System  
📅 **Data**: Agosto 2025

---

**Características Implementadas:**
- ✅ Glassmorphism everywhere
- ✅ Gradientes vibrantes e neon
- ✅ Efeitos de blur e transparência  
- ✅ Animações futurísticas
- ✅ Gen Z appeal
- ✅ Componentes Web3 específicos
- ✅ Efeitos holográficos avançados
- ✅ Sistema de partículas interativo
- ✅ Acessibilidade completa
- ✅ Responsividade otimizada