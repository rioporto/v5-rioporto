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
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
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