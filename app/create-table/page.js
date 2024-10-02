'use client';
import { useState } from 'react';
import Navbar from '../components/nav-bar';

export default function CreateTablePage() {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: 'text' }]);

  const addColumn = () => {
    setColumns([...columns, { name: '', type: 'text' }]);
  };

  const removeColumn = (index) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);
  };

  const handleColumnChange = (index, field, value) => {
    const newColumns = [...columns];
    newColumns[index][field] = value;
    setColumns(newColumns);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/create-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableName, columns }),
      });

      if (!res.ok) {
        throw new Error(`Erro HTTP! status: ${res.status}`);
      }

      alert('Tabela criada com sucesso!');
      // Limpar o formulário
      setTableName('');
      setColumns([{ name: '', type: 'text' }]);
    } catch (error) {
      console.error('Erro ao criar tabela:', error);
      alert('Erro ao criar tabela.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />

      <h1 className="mt-20 text-3xl font-bold text-blue-600 mb-6">Criar Nova Tabela</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Nome da Tabela</label>
          <input
            type="text"
            placeholder="Nome da Tabela"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg text-black"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Definir Colunas</h2>

        {columns.map((column, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Nome da Coluna</label>
            <input
              type="text"
              placeholder="Nome da Coluna"
              value={column.name}
              onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />

            <label className="block text-gray-700 font-medium mt-2 mb-2">Tipo de Dado</label>
            <select
              value={column.type}
              onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
            >
              <option value="text">Texto</option>
              <option value="number">Número</option>
              <option value="date">Data</option>
            </select>

            <button
              type="button"
              onClick={() => removeColumn(index)}
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Remover Coluna
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addColumn}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
        >
          Adicionar Coluna
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Criar Tabela
        </button>
      </form>
    </div>
  );
}
