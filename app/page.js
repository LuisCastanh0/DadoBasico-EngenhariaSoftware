// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Criação de Bases de Dados</h1>
      <nav>
        <ul>
          <li>
            <Link href="/create-table">Criar Nova Tabela</Link>
          </li>
          <li>
            <Link href="/add-data">Adicionar Dados</Link>
          </li>
          <li>
            <Link href="/view-table">Visualizar Tabelas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}