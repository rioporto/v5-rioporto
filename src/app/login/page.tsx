import { redirect } from 'next/navigation';

export default function LoginPage() {
  // Redireciona para a página de auth/login
  redirect('/auth/login');
}