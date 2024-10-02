import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold mr-auto">
          DADO BÁSICO
        </div>
        <ul className="flex space-x-6">
          <li className="text-white hover:text-gray-300 transition duration-300">
            <Link href="/">
              Home
            </Link>
          </li>
          <li className="text-white hover:text-gray-300 transition duration-300">
            <Link href="/create-table">
              Criar Nova Tabela
            </Link>
          </li>
          <li className="text-white hover:text-gray-300 transition duration-300">
            <Link href="/add-data">
              Adicionar Dados
            </Link>
          </li>
          <li className="text-white hover:text-gray-300 transition duration-300">
            <Link href="/view-table">
              Visualizar Tabela
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
