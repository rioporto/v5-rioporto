import { redirect } from 'next/navigation';

export default function RegisterPage() {
  // Redireciona para a página de auth/register
  redirect('/auth/register');
}