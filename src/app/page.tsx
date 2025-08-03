'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Bitcoin, Sparkles, Lock, ChevronDown, Globe, Zap, Shield } from 'lucide-react';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to launch date (30 days from now)
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
      // Here you would typically send the email to your backend
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-purple-600/20 to-blue-600/20 animate-gradient-shift" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,119,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <Bitcoin className="h-4 w-4 text-orange-500/20" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="relative">
              <Bitcoin className="h-12 w-12 text-orange-500" />
              <Sparkles className="h-6 w-6 text-purple-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h3 className="text-2xl font-light tracking-wider text-center bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
            RioPorto P2P
          </h3>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            O futuro do
            <span className="block bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
              P2P Trading
            </span>
            está chegando
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
            Uma nova era de negociação descentralizada.
            <br />
            <span className="text-gray-500">Aprenda Bitcoin. Negocie sem intermediários. Tenha controle total.</span>
          </p>

          {/* Mystery features */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">5 Modelos Visuais</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Execução Instantânea</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm text-gray-300">100% Seguro</span>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-12 animate-fade-in-up animation-delay-200">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-orange-500">{timeLeft.days}</div>
              <div className="text-sm text-gray-400">Dias</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-purple-500">{timeLeft.hours}</div>
              <div className="text-sm text-gray-400">Horas</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-blue-500">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-400">Minutos</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-green-500">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-400">Segundos</div>
            </div>
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
                className="w-full px-6 py-4 pr-32 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-white placeholder-gray-400 transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 group"
              >
                <span>Notificar</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <div className="text-center py-4 px-6 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
              <p className="text-green-400 flex items-center justify-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Pronto! Você será o primeiro a saber.</span>
              </p>
            </div>
          )}
        </div>

        {/* Teaser text */}
        <div className="mt-12 text-center animate-fade-in-up animation-delay-600">
          <p className="text-gray-500 mb-4">
            Enquanto isso, que tal começar sua jornada Bitcoin?
          </p>
          <a
            href="https://bitcoin.org/pt_BR/comecando"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-400 transition-colors underline underline-offset-4"
          >
            Aprenda sobre Bitcoin →
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gray-600" />
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-5%, 5%) rotate(1deg); }
          50% { transform: translate(5%, -5%) rotate(-1deg); }
          75% { transform: translate(-5%, -5%) rotate(1deg); }
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-shift {
          animation: gradient-shift 20s ease infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
          animation-fill-mode: both;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </main>
  );
}