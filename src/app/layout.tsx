import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ModelSwitcher } from "@/components/shared/ModelSwitcher";

export const metadata: Metadata = {
  title: "RioPorto P2P - Plataforma Multi-Modelo",
  description: "Plataforma P2P multi-modelo para negociação de ativos digitais. Acesse diferentes interfaces personalizadas para cada tipo de usuário.",
  keywords: "P2P, Bitcoin, trading, exchange, rioporto, multi-modelo",
  authors: [{ name: "RioPorto Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="theme-minimalist" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&family=Source+Sans+Pro:wght@300;400;600;700&family=Source+Code+Pro:wght@300;400;500;600&family=Merriweather:wght@300;400;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600&family=Orbitron:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&family=Exo+2:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider defaultTheme="minimalist" storageKey="rioporto-theme">
          <AuthProvider>
            {children}
            <ModelSwitcher />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}