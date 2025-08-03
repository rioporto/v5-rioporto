'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Bitcoin, ChevronDown, Globe, Zap, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeProvider';

export default function ComingSoon() {
  const { currentTheme, themeConfig } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const headlines = {
    minimalist: {
      main: 'Simplicidade no',
      highlight: 'P2P Trading',
      sub: 'Menos é mais. Trading sem distrações.'
    },
    financial: {
      main: 'Trading profissional',
      highlight: 'Bloomberg-style',
      sub: 'Ferramentas institucionais para todos os traders.'
    },
    'crypto-native': {
      main: 'O futuro é',
      highlight: 'Descentralizado',
      sub: 'Web3 native. DeFi ready. Totalmente on-chain.'
    },
    institutional: {
      main: 'Confiança e',
      highlight: 'Compliance',
      sub: 'Segurança institucional para grandes volumes.'
    },
    gaming: {
      main: 'Level up your',
      highlight: 'Trading Game',
      sub: 'Gamificação e recompensas para traders.'
    }
  };

  const headline = headlines[currentTheme] || headlines.minimalist;

  return (
    <div className="min-h-screen overflow-hidden relative bg-background text-foreground">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 animate-gradient-shift" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Bitcoin className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-light tracking-wider text-center">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              RioPorto {themeConfig.name}
            </span>
          </h3>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {headline.main}
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              {headline.highlight}
            </span>
            está chegando
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-muted-foreground">
            {headline.sub}
            <br />
            <span className="opacity-70">Aprenda Bitcoin. Negocie sem intermediários. Tenha controle total.</span>
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-sm bg-card border border-border rounded-lg">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm">5 Modelos Visuais</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-sm bg-card border border-border rounded-lg">
              <Zap className="h-4 w-4 text-warning" />
              <span className="text-sm">Execução Instantânea</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-sm bg-card border border-border rounded-lg">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm">100% Seguro</span>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-12 animate-fade-in-up animation-delay-200">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { value: timeLeft.days, label: 'Dias' },
              { value: timeLeft.hours, label: 'Horas' },
              { value: timeLeft.minutes, label: 'Minutos' },
              { value: timeLeft.seconds, label: 'Segundos' }
            ].map((item, i) => (
              <div key={i} className="backdrop-blur-sm p-4 shadow-md bg-card border border-border rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-primary font-mono">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Email capture */}
        <div className="w-full max-w-md animate-fade-in-up animation-delay-400">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seja o primeiro a saber..."
                className="w-full px-6 py-4 pr-32 backdrop-blur-sm transition-all bg-input border border-border rounded-full text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 font-medium transition-opacity flex items-center space-x-2 group hover:opacity-90 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                <span>Notificar</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="text-center py-4 px-6 backdrop-blur-sm bg-success/20 rounded-full border border-success/30">
              <p className="flex items-center justify-center space-x-2 text-success">
                <span>✓</span>
                <span>Pronto! Você será o primeiro a saber.</span>
              </p>
            </div>
          )}
        </div>

        {/* Teaser */}
        <div className="mt-12 text-center animate-fade-in-up animation-delay-600">
          <p className="mb-4 text-muted-foreground">
            Enquanto isso, que tal começar sua jornada Bitcoin?
          </p>
          <a
            href="https://bitcoin.org/pt_BR/comecando"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors underline underline-offset-4 hover:opacity-80 text-primary"
          >
            Aprenda sobre Bitcoin →
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}