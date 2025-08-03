'use client';

import React from 'react';
import { Building2, Rocket, Shield, Zap } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Building2 className="w-12 h-12 text-black" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          RioPorto P2P
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-300 mb-8">
          A Nova Era do Bitcoin no Brasil
        </p>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-3 mb-12">
          <Rocket className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-500 font-semibold">EM BREVE</span>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Shield className="w-10 h-10 text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Segurança Total</h3>
            <p className="text-gray-400">Proteção de nível bancário para suas transações P2P</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Zap className="w-10 h-10 text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Ultra Rápido</h3>
            <p className="text-gray-400">Transações instantâneas com confirmação imediata</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Building2 className="w-10 h-10 text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">100% Regulado</h3>
            <p className="text-gray-400">Conformidade total com a legislação brasileira</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-gray-400">
          <p className="mb-2">Enquanto isso, conheça nossas versões de demonstração:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a href="https://v1.rioporto.com.br" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              V1 - Minimalista
            </a>
            <span className="text-gray-600">•</span>
            <a href="https://v2.rioporto.com.br" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              V2 - Financeiro
            </a>
            <span className="text-gray-600">•</span>
            <a href="https://v3.rioporto.com.br" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              V3 - Crypto Native
            </a>
            <span className="text-gray-600">•</span>
            <a href="https://v4.rioporto.com.br" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              V4 - Institucional
            </a>
            <span className="text-gray-600">•</span>
            <a href="https://v5.rioporto.com.br" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              V5 - Gaming
            </a>
          </div>
        </div>
      </div>

      {/* CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}