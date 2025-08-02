import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-muted-foreground">404</span>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Página não encontrada
          </h1>
          
          <p className="text-muted-foreground mb-6">
            A página que você está procurando não existe ou foi movida para outro local.
          </p>
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">
              Voltar ao início
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/dashboard">
              Ir para o Dashboard
            </Link>
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-semibold text-sm mb-2">Páginas populares:</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link 
              href="/market" 
              className="text-xs text-primary hover:underline"
            >
              Mercado
            </Link>
            <Link 
              href="/academy" 
              className="text-xs text-primary hover:underline"
            >
              Academy
            </Link>
            <Link 
              href="/dashboard/portfolio" 
              className="text-xs text-primary hover:underline"
            >
              Portfolio
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}