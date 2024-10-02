// app/page.js
import Link from 'next/link';
import Navbar from './components/nav-bar';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
     <Navbar />
      <h1 className="mt-20 text-4xl font-bold text-center text-blue-600 mb-8">
        Bem-vindo ao Sistema de Criação de Bases de Dados
      </h1>
      <nav>
        <ul className="flex flex-col space-y-4">
          <li className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            <Link href="/create-table">
                Criar Nova Tabela
            </Link>
          </li>
          <li className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300">
            <Link href="/add-data">
                Adicionar Dados
            </Link>
          </li>
          <li className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300"> 
            <Link href="/view-table">
                Visualizar Tabelas
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
